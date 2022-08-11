import { PartialType } from '@nestjs/swagger';
import { CreateCatalogueDto } from '@core/dto';

export class UpdateCatalogueDto extends PartialType(CreateCatalogueDto) {}
