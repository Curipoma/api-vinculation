import { Global, Module } from '@nestjs/common';
import { CataloguesController } from '@core/controllers';
import { CataloguesService } from '@core/services';
import { DatabaseModule } from '@database';
import { coreProviders } from '@core/providers';

@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [CataloguesController],
  providers: [...coreProviders, CataloguesService],
  exports: [CataloguesService],
})
export class CoreModule {}
