import { ProgramStudi } from '@prisma/client';
import { ProgramStudiModel } from 'src/database/model';
import {
  ProgramStudiWithMahasiswaAndMatakuliah,
  MahasiswaPrismaIncludeAngkatanAndProgramStudi,
  MatakuliahIncludeProgramStudiAndSemester,
} from 'src/database/prisma/type';
import { mahasiswaPrismaToModel } from './mahasiswa.mapper';
import { matakuliahPrismaToModel } from './matakuliah.mapper';

export function programStudiListPrismaToModel(
  jurusanList: ProgramStudiWithMahasiswaAndMatakuliah[],
): ProgramStudiModel[] {
  return jurusanList.map((jurusan) => {
    return programStudiPrismaToModel(jurusan);
  });
}

export function programStudiPrismaToModel(
  program_studi: ProgramStudi & {
    Mahasiswa: MahasiswaPrismaIncludeAngkatanAndProgramStudi[];
    MataKuliah: MatakuliahIncludeProgramStudiAndSemester[];
  },
): ProgramStudiModel {
  const data: ProgramStudiModel = {
    id: program_studi.id,
    nama_prodi: program_studi.nama_prodi,

    list_mahasiswa: program_studi.Mahasiswa.map((mahasiswa) => {
      delete mahasiswa.password;
      return mahasiswaPrismaToModel(mahasiswa);
    }),
    list_matakuliah: program_studi.MataKuliah.map((matakuliah) => {
      return matakuliahPrismaToModel(matakuliah);
    }),
    total_mahasiswa: program_studi.Mahasiswa.length,
    total_matakuliah: program_studi.MataKuliah.length,
  };
  return data;
}
