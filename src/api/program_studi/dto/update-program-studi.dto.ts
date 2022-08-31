import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProgramStudiDto {
  @IsString()
  @IsNotEmpty()
  nama: string;
}
