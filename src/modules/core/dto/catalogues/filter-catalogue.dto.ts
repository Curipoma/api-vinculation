import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '@core/dto';

export class FilterCatalogueDto extends PartialType(PaginationDto) {
  @IsOptional()
  @IsString()
  readonly name: string;
}
