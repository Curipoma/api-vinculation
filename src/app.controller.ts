import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { DatabaseSeeder } from '@database';
import { ResponseHttpModel } from '@shared/models';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private databaseSeeder: DatabaseSeeder,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('init')
  async init(): Promise<ResponseHttpModel> {
    await this.databaseSeeder.run();

    return {
      data: true,
      message: '',
      title: '',
    };
  }
}
