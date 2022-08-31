import { MataKuliahModel } from 'src/database/model';
import { MatakuliahIncludeProgramStudiAndSemester } from 'src/database/prisma/type';

export function matakuliahPrismaToModel(
  matakuliah: MatakuliahIncludeProgramStudiAndSemester,
): MataKuliahModel {
  return <MataKuliahModel>{
    id: matakuliah.id,
    kode_matakuliah: matakuliah.kode_matakuliah,
    nama_matakuliah: matakuliah.nama_matakuliah,
    sks: matakuliah.sks,
    semester: matakuliah.semester.semester,
    program_studi: matakuliah.program_studi.nama_prodi,
  };
}
