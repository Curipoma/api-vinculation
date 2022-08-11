import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AccessControlModule } from 'nest-access-control';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { roles } from './app.roles';
import { enviroments } from './enviroments';
import { config } from '@config';
import { AuthModule } from '@auth/modules';
import { CoreModule } from '@core/modules';
import { CommonModule } from '@common/modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
      }),
    }),
    HttpModule,
    AccessControlModule.forRoles(roles),
    CommonModule,
    AuthModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
