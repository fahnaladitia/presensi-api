import { MataKuliah } from '@prisma/client';

export type MatakuliahIncludeProgramStudiAndSemester = MataKuliah & {
  program_studi: {
    nama_prodi: string;
  };
  semester: {
    semester: string;
  };
};
