import { Mahasiswa } from '@prisma/client';

export type MahasiswaPrismaIncludeAngkatanAndProgramStudi = Mahasiswa & {
  angkatan: {
    angkatan: number;
  };
  program_studi: {
    nama_prodi: string;
  };
};
