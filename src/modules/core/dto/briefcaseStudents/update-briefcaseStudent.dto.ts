import { PartialType } from '@nestjs/swagger';
import { CreateBriefcaseStudentDto } from '@core/dto';

export class UpdateBriefcaseStudentDto extends PartialType(CreateBriefcaseStudentDto) {}
