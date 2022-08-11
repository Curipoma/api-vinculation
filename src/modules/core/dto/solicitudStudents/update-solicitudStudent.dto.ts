import { PartialType } from '@nestjs/swagger';
import { CreateSolicitudStudentDto } from '@core/dto';

export class UpdateSolicitudStudentsDto extends PartialType(CreateSolicitudStudentDto) {}
