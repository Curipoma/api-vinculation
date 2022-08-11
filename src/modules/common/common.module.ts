import { Global, Module } from '@nestjs/common';
import { FilesController } from './files/files.controller';
import { FilesService } from './files/files.service';

@Global()
@Module({
  imports: [],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [],
})
export class CommonModule {}
