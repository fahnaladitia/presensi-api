import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthAdminLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
