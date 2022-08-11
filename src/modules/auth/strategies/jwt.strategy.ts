import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '@auth/services';
import { config } from '@config';
import { ConfigType } from '@nestjs/config';
import { PayloadTokenModel } from '@auth/models';
import { UserEntity } from '@auth/entities';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private userService: UsersService,
    @Inject(config.KEY) configService: ConfigType<typeof config>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtSecret,
    });
  }

  async validate(payload: PayloadTokenModel) {
    const serviceResponse = await this.userService.findOne(payload.id);
    const user = serviceResponse.data as UserEntity;

    if (!user) throw new UnauthorizedException('Token is not valid.');

    if (user.suspendedAt) throw new UnauthorizedException('User is suspended.');

    if (user.maxAttempts === 0)
      throw new UnauthorizedException('User is suspended.');

    return user;
  }
}
