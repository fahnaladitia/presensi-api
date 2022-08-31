import { ProgramStudi } from '@prisma/client';
import { MahasiswaPrismaIncludeAngkatanAndProgramStudi } from './mahasiswa.type';
import { MatakuliahIncludeProgramStudiAndSemester } from './matakuliah.type';

export type ProgramStudiWithMahasiswaAndMatakuliah = ProgramStudi & {
  Mahasiswa: MahasiswaPrismaIncludeAngkatanAndProgramStudi[];
  MataKuliah: MatakuliahIncludeProgramStudiAndSemester[];
};
