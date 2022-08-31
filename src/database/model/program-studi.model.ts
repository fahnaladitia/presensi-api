import { MahasiswaModel, MataKuliahModel } from '.';

export interface ProgramStudiModel {
  id: string;
  nama_prodi: string;
  list_mahasiswa: MahasiswaModel[];
  total_mahasiswa: number;
  list_matakuliah: MataKuliahModel[];
  total_matakuliah: number;
}
