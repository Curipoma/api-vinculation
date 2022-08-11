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
import { CataloguesService } from '@core/services';
import {
  CreateCatalogueDto,
  FilterCatalogueDto,
  UpdateCatalogueDto,
} from '@core/dto';

@ApiTags('catalogues')
@Controller('catalogues')
export class CataloguesController {
  constructor(private catalogueService: CataloguesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateCatalogueDto) {
    const data = await this.catalogueService.create(payload);

    return {
      data,
      message: 'created',
    };
  }

  @ApiOperation({ summary: 'List all catalogues' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue() {
    const response = await this.catalogueService.catalogue();
    return {
      data: response.data,
      message: `catalogue`,
      title: `Catalogue`,
    } as ResponseHttpModel;
  }

  @ApiOperation({ summary: 'List of catalogues' })
  // @Roles(RoleEnum.ADMIN)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: FilterCatalogueDto) {
    const response = await this.catalogueService.findAll(params);
    return {
      data: response.data,
      pagination: response.pagination,
      message: `index`,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.catalogueService.findOne(id);
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
    @Body() payload: UpdateCatalogueDto,
  ) {
    const data = await this.catalogueService.update(id, payload);

    return {
      data: data,
      message: `Catalogue updated ${id}`,
      title: `Updated`,
    } as ResponseHttpModel;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const data = await this.catalogueService.remove(id);

    return {
      data,
      message: `Catalogue deleted ${id}`,
      title: `Deleted`,
    };
  }

  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: number[]) {
    const data = await this.catalogueService.removeAll(payload);

    return {
      data,
      message: `Catalogues deleted`,
      title: `Deleted`,
    };
  }
}
