import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_ROUTE_KEY } from '@auth/constants';

@Injectable()
export class PublicRouteGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.reflector.get(IS_PUBLIC_ROUTE_KEY, context.getHandler());
  }
}
