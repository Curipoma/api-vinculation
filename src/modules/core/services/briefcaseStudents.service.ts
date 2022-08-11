import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike, In } from 'typeorm';
import {
    CreateBriefcaseStudentDto,
    FilterBriefcaseStudentDto,
  PaginationDto,
  UpdateBriefcaseStudentDto,
} from '@core/dto';
import { BriefcaseStudentEntity } from '@core/entities';
import { RepositoryEnum } from '@shared/enums';

@Injectable()
export class BriefcaseStudentsService {
  constructor(
    @Inject(RepositoryEnum.BRIEFCASESTUDENT_REPOSITORY)
    private repository: Repository<BriefcaseStudentEntity>,
  ) {}

  async create(payload: CreateBriefcaseStudentDto) {
    const newBriefcase = this.repository.create(payload);

    const briefcaseCreated = await this.repository.save(newBriefcase);

    return await this.repository.save(briefcaseCreated);
  }

  async briefcaseStudent() {
    const data = await this.repository.findAndCount({
      take: 1000,
    });

    return { pagination: { totalItems: data[1], limit: 1000 }, data: data[0] };
  }

  async findAll(params?: FilterBriefcaseStudentDto) {
    //Pagination & Filter by search
    if (params) {
      return await this.paginateAndFilter(params);
    }

    //All
    const data = await this.repository.findAndCount();

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number) {
    const briefcase = await this.repository.findOne({
      where: { id },
    });

    if (!briefcase) {
      throw new NotFoundException('Briefcase not found');
    }

    return briefcase;
  }

  async update(id: number, payload: UpdateBriefcaseStudentDto) {
    const briefcase = await this.repository.findOneBy({ id });

    if (!briefcase) {
      throw new NotFoundException('Briefcase not found');
    }

    this.repository.merge(briefcase, payload);

    return this.repository.save(briefcase);
  }

  async remove(id: number) {
    const briefcase = await this.repository.findOneBy({ id });

    if (!briefcase) {
      throw new NotFoundException('Briefcase not found');
    }

    await this.repository.softDelete(id);
    return true;
  }

  async removeAll(payload: any) {
    const briefcases = await this.repository.findBy({ id: In(payload.ids) });

    for (const briefcase of briefcases) {
      await this.repository.softDelete(briefcase.id);
    }

    return true;
  }

  private async paginateAndFilter(params: FilterBriefcaseStudentDto) {
    let where:
      | FindOptionsWhere<BriefcaseStudentEntity>
      | FindOptionsWhere<BriefcaseStudentEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ name: ILike(`%${search}%`) });
    }

    const data = await this.repository.findAndCount({
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return { pagination: { limit, totalItems: data[1] }, data: data[0] };
  }
}
