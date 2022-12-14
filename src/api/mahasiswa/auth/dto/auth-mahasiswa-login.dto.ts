import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class AuthMahasiswaLoginDto {
  @IsEmail()
  @ValidateIf((object, value) => value != null)
  email: string | null;

  @IsString()
  @ValidateIf((object, value) => value != null)
  nim: string | null;

  @IsNotEmpty()
  @IsString()
  password: string;
}
