import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtGuard } from '@auth/guards';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ACGuard, Role, UseRoles } from 'nest-access-control';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    UseGuards(JwtGuard, ACGuard),
    ApiBearerAuth(),
    UseRoles(...roles),
  );
}
