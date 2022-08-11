import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '@auth/enums';
import { ROLES_KEY } from '@auth/constants';

export const Roles = (...roles: RoleEnum[]) => SetMetadata(ROLES_KEY, roles);
