import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseHttpModel } from '@shared/models';
import { SolicitudStudentsService } from '@core/services';
import {
  CreateSolicitudStudentDto,
  FilterCatalogueDto,
  UpdateSolicitudStudentsDto,
} from '@core/dto';

@ApiTags('SolicitudStudents')
@Controller('SolicitudStudents')
export class SolicitudStudentsController {
  constructor(private solicitudStudentsService: SolicitudStudentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateSolicitudStudentDto) {
    const data = await this.solicitudStudentsService.create(payload);

    return {
      data,
      message: 'Solicitud created',
    };
  }

  @ApiOperation({ summary: 'List all solicitudStudent' })
  @Get('solicitudStudent')
  @HttpCode(HttpStatus.OK)
  async solicitudStudent() {
    const response = await this.solicitudStudentsService.solicitudStudent();
    return {
      data: response.data,
      message: `Solicitud`,
      title: `Solicitud`,
    } as ResponseHttpModel;
  }

  @ApiOperation({ summary: 'List of solicitudStudents' })
  // @Roles(RoleEnum.ADMIN)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: FilterCatalogueDto) {
    const response = await this.solicitudStudentsService.findAll(params);
    return {
      data: response.data,
      pagination: response.pagination,
      message: `index`,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.solicitudStudentsService.findOne(id);
    return {
      data,
      message: `show ${id}`,
      title: `Success`,
    } as ResponseHttpModel;
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateSolicitudStudentsDto,
  ) {
    const data = await this.solicitudStudentsService.update(id, payload);

    return {
      data: data,
      message: `Solicitud updated ${id}`,
      title: `Updated`,
    } as ResponseHttpModel;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const data = await this.solicitudStudentsService.remove(id);

    return {
      data,
      message: `Solicitud deleted ${id}`,
      title: `Deleted`,
    };
  }

  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: number[]) {
    const data = await this.solicitudStudentsService.removeAll(payload);

    return {
      data,
      message: `Solicitud deleted`,
      title: `Deleted`,
    };
  }
}
