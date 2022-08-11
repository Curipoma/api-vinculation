import { Exclude, Expose } from 'class-transformer';
import { UserDto } from '@auth/dto';

@Exclude()
export class ReadUserDto extends UserDto {
  @Expose()
  readonly id;

  @Expose()
  readonly email;

  @Expose()
  readonly lastname;

  @Expose()
  readonly name;

  @Expose()
  readonly username;
}
