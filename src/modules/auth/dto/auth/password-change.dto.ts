import { IsNotEmpty, IsString } from 'class-validator';

export class PasswordChangeDto {
  @IsNotEmpty()
  @IsString()
  confirmationPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  oldPassword: string;
}
