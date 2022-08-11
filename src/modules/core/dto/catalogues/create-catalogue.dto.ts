import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCatalogueDto {
  @IsString({ message: 'Debe ser un string' })
  @MinLength(3, { message: 'El número de caracteres mínimo es 3.' })
  @MaxLength(255, { message: 'Maximo 255 caracteres' })
  readonly name: string;
}
