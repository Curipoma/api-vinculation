import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@auth/constants';
import { PayloadTokenModel } from '@auth/models';
import { RoleEnum } from '@auth/enums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles: RoleEnum[] = this.reflector.get(
      ROLES_KEY,
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadTokenModel;
    const isAuth = roles.some((role) => role === user.role);
    if (!isAuth) {
      throw new ForbiddenException();
    }
    return isAuth;
  }
}
