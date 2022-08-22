import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class AuthChangePasswordDto {
  @IsEmail()
  @ValidateIf((object, value) => value != null)
  email: string | null;

  @IsString()
  @ValidateIf((object, value) => value != null)
  nim: string | null;

  @IsNotEmpty()
  @IsString()
  new_password: string;

  @IsNotEmpty()
  @IsString()
  confirm_password: string;
}
