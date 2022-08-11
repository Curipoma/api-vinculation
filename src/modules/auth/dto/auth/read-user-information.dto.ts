import { Exclude, Expose } from 'class-transformer';
import { UserDto } from '@auth/dto';

@Exclude()
export class ReadUserInformationDto extends UserDto {
  @Expose()
  readonly id;

  @Expose()
  readonly email;

  @Expose()
  readonly emailVerifiedAt;

  @Expose()
  readonly phone;

  @Expose()
  readonly username;
}
