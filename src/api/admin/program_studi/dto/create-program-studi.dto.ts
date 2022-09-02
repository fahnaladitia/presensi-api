import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProgramStudiDto {
  @IsString()
  @IsNotEmpty()
  nama: string;
}
