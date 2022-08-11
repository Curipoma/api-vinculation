import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike, In } from 'typeorm';
import {
  CreateSolicitudStudentDto,
  FilterCatalogueDto,
  FilterSolicitudStudentDto,
  PaginationDto,
  UpdateSolicitudStudentsDto,
} from '@core/dto';
import { SolicitudStudentEntity } from '@core/entities';
import { RepositoryEnum } from '@shared/enums';

@Injectable()
export class SolicitudStudentsService {
  constructor(
    @Inject(RepositoryEnum.SOLICITUDSTUDENT_REPOSITORY)
    private repository: Repository<SolicitudStudentEntity>,
  ) {}

  async create(payload: CreateSolicitudStudentDto) {
    const newSolicitudStudent = this.repository.create(payload);

    const solicitudStudentCreated = await this.repository.save(newSolicitudStudent);

    return await this.repository.save(solicitudStudentCreated);
  }

  async solicitudStudent() {
    const data = await this.repository.findAndCount({
      take: 1000,
    });

    return { pagination: { totalItems: data[1], limit: 1000 }, data: data[0] };
  }

  async findAll(params?: FilterCatalogueDto) {
    //Pagination & Filter by search
    if (params) {
      return await this.paginateAndFilter(params);
    }

    //All
    const data = await this.repository.findAndCount();

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number) {
    const solicitudStudent = await this.repository.findOne({
      where: { id },
    });

    if (!solicitudStudent) {
      throw new NotFoundException('Solicitud not found');
    }

    return solicitudStudent;
  }

  async update(id: number, payload: UpdateSolicitudStudentsDto) {
    const solicitudStudent = await this.repository.findOneBy({ id });

    if (!solicitudStudent) {
      throw new NotFoundException('Solicitud not found');
    }

    this.repository.merge(solicitudStudent, payload);

    return this.repository.save(solicitudStudent);
  }

  async remove(id: number) {
    const solicitudStudent = await this.repository.findOneBy({ id });

    if (!solicitudStudent) {
      throw new NotFoundException('Solicitud not found');
    }

    await this.repository.softDelete(id);
    return true;
  }

  async removeAll(payload: any) {
    const solicitudStudents = await this.repository.findBy({ id: In(payload.ids) });

    for (const solicitudStudent of solicitudStudents) {
      await this.repository.softDelete(solicitudStudent.id);
    }

    return true;
  }

  private async paginateAndFilter(params: FilterSolicitudStudentDto) {
    let where:
      | FindOptionsWhere<SolicitudStudentEntity>
      | FindOptionsWhere<SolicitudStudentEntity>[];
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
