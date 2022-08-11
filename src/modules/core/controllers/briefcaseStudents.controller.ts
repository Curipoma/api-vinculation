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
  import { BriefcaseStudentsService } from '@core/services';
  import {
    CreateBriefcaseStudentDto,
    FilterBriefcaseStudentDto,
    UpdateBriefcaseStudentDto,

  } from '@core/dto';
  
  @ApiTags('SolicitudStudents')
  @Controller('SolicitudStudents')
  export class BriefcaseStudentsController {
    constructor(private briefcaseStudentsService: BriefcaseStudentsService) {}
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateBriefcaseStudentDto) {
      const data = await this.briefcaseStudentsService.create(payload);
  
      return {
        data,
        message: 'Briefcase created',
      };
    }
  
    @ApiOperation({ summary: 'List all briefcaseStudent' })
    @Get('briefcaseStudent')
    @HttpCode(HttpStatus.OK)
    async briefcaseStudent() {
      const response = await this.briefcaseStudentsService.briefcaseStudent();
      return {
        data: response.data,
        message: `Briefcase`,
        title: `Briefcase`,
      } as ResponseHttpModel;
    }
  
    @ApiOperation({ summary: 'List of briefcaseStudent' })
    // @Roles(RoleEnum.ADMIN)
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() params: FilterBriefcaseStudentDto) {
      const response = await this.briefcaseStudentsService.findAll(params);
      return {
        data: response.data,
        pagination: response.pagination,
        message: `index`,
      };
    }
  
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id', ParseIntPipe) id: number) {
      const data = await this.briefcaseStudentsService.findOne(id);
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
      @Body() payload: UpdateBriefcaseStudentDto,
    ) {
      const data = await this.briefcaseStudentsService.update(id, payload);
  
      return {
        data: data,
        message: `Briefcase updated ${id}`,
        title: `Updated`,
      } as ResponseHttpModel;
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(@Param('id', ParseIntPipe) id: number) {
      const data = await this.briefcaseStudentsService.remove(id);
  
      return {
        data,
        message: `Briefcase deleted ${id}`,
        title: `Deleted`,
      };
    }
  
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(@Body() payload: number[]) {
      const data = await this.briefcaseStudentsService.removeAll(payload);
  
      return {
        data,
        message: `Briefcase deleted`,
        title: `Deleted`,
      };
    }
  }
  