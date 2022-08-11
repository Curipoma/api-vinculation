import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike, In } from 'typeorm';
import {
  CreateCatalogueDto,
  FilterCatalogueDto,
  PaginationDto,
  UpdateCatalogueDto,
} from '@core/dto';
import { CatalogueEntity } from '@core/entities';
import { RepositoryEnum } from '@shared/enums';

@Injectable()
export class CataloguesService {
  constructor(
    @Inject(RepositoryEnum.CATALOGUE_REPOSITORY)
    private repository: Repository<CatalogueEntity>,
  ) {}

  async create(payload: CreateCatalogueDto) {
    const newCatalogue = this.repository.create(payload);

    const catalogueCreated = await this.repository.save(newCatalogue);

    return await this.repository.save(catalogueCreated);
  }

  async catalogue() {
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
    const catalogue = await this.repository.findOne({
      where: { id },
    });

    if (!catalogue) {
      throw new NotFoundException('Catalogue not found');
    }

    return catalogue;
  }

  async update(id: number, payload: UpdateCatalogueDto) {
    const catalogue = await this.repository.findOneBy({ id });

    if (!catalogue) {
      throw new NotFoundException('Catalogue not found');
    }

    this.repository.merge(catalogue, payload);

    return this.repository.save(catalogue);
  }

  async remove(id: number) {
    const catalogue = await this.repository.findOneBy({ id });

    if (!catalogue) {
      throw new NotFoundException('Catalogue not found');
    }

    await this.repository.softDelete(id);
    return true;
  }

  async removeAll(payload: any) {
    const catalogues = await this.repository.findBy({ id: In(payload.ids) });

    for (const catalogue of catalogues) {
      await this.repository.softDelete(catalogue.id);
    }

    return true;
  }

  private async paginateAndFilter(params: FilterCatalogueDto) {
    let where:
      | FindOptionsWhere<CatalogueEntity>
      | FindOptionsWhere<CatalogueEntity>[];
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
