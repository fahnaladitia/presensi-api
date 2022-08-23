import { IsNotEmpty, IsString } from 'class-validator';

export class AuthChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  old_password: string;

  @IsNotEmpty()
  @IsString()
  new_password: string;

  @IsNotEmpty()
  @IsString()
  confirm_password: string;
}
