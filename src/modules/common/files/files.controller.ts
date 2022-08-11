import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { filterFileHelper } from './helpers/filter-file.helper';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      // fileFiter: filterFileHelper,
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File) {
    return 'hola';
    return file;
  }
}
