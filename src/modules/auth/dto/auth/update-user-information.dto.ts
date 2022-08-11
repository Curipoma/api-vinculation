import { PickType } from '@nestjs/swagger';
import { UserDto } from '@auth/dto';

export class UpdateUserInformationDto extends PickType(UserDto, [
  'email',
  'phone',
  'username',
]) {}
