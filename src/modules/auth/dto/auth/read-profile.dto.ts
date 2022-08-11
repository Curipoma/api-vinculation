import { Exclude, Expose } from 'class-transformer';
import { UserDto } from '@auth/dto';

@Exclude()
export class ReadProfileDto extends UserDto {
  @Expose()
  readonly id;

  @Expose()
  readonly birthdate;

  @Expose()
  readonly bloodType;

  @Expose()
  readonly ethnicOrigin;

  @Expose()
  readonly gender;

  @Expose()
  readonly identification;

  @Expose()
  readonly identificationType;

  @Expose()
  readonly lastname;

  @Expose()
  readonly maritalStatus;

  @Expose()
  readonly name;

  @Expose()
  readonly sex;
}
