import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthAdminSignupDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
