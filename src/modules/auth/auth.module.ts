import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { config } from '@config';
import { AuthController, UsersController } from '@auth/controllers';
import { AuthService, UsersService } from '@auth/services';
import { JwtStrategy } from '@auth/strategies';
import { authProviders } from '@auth/providers';
import { DatabaseModule } from '@database';

@Global()
@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: {
            expiresIn: '10d',
          },
        };
      },
    }),
  ],
  controllers: [AuthController, UsersController],
  providers: [...authProviders, JwtStrategy, AuthService, UsersService],
  exports: [UsersService],
})
export class AuthModule {}
