import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class AuthDosenLoginDto {
  @IsEmail()
  @ValidateIf((object, value) => value != null)
  email: string | null;

  @IsString()
  @ValidateIf((object, value) => value != null)
  nip: string | null;

  @IsNotEmpty()
  @IsString()
  password: string;
}
