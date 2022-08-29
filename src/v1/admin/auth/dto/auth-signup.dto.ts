import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthSignupDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
