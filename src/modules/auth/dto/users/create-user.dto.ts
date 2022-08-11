import { PickType } from '@nestjs/swagger';
import { UserDto } from '@auth/dto';

export class CreateUserDto extends PickType(UserDto, [
  'email',
  'lastname',
  'name',
  'password',
  'passwordChanged',
  'roles',
  'username',
]) {}
