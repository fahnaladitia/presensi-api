import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class AuthLoginDto {
  @IsEmail()
  @ValidateIf((object, value) => value != null)
  email: string | null;

  @IsString()
  @ValidateIf((object, value) => value != null)
  nim: string | null;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  imei: string;
}
