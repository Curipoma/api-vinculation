import { Injectable } from '@nestjs/common';
import { CataloguesService } from '@core/services';
import { CatalogueStateEnum, CatalogueTypeEnum } from '@shared/enums';
import { CreateCatalogueDto } from '@core/dto';

@Injectable()
export class CataloguesSeeder {
  constructor(private catalogueService: CataloguesService) {}

  run() {
    this.createPositionCatalogues();
  }

  createPositionCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];

    catalogues.push({
      code: '1',
      description: 'Rector',
      name: 'Rector',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.RECTOR,
    } as CreateCatalogueDto);

    catalogues.forEach((catalogue) => {
      this.catalogueService.create(catalogue);
    });
  }

  createProjectStatesCatalogues() {
    const catalogues: CreateCatalogueDto[] = [];

    catalogues.push({
      code: '1',
      description: 'Aprobado',
      name: 'A+',
      state: CatalogueStateEnum.ACTIVE,
      type: CatalogueTypeEnum.APPROVED,
    } as CreateCatalogueDto);

    catalogues.forEach((catalogue) => {
      this.catalogueService.create(catalogue);
    });
  }
}
