import { PickType } from '@nestjs/swagger';
import { UserDto } from '@auth/dto';

export class UpdateProfileDto extends PickType(UserDto, [
  'bloodType',
  'ethnicOrigin',
  'identificationType',
  'gender',
  'maritalStatus',
  'sex',
  'birthdate',
  'identification',
  'lastname',
  'name',
]) {}
