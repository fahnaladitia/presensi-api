import { MahasiswaModel, MataKuliahModel } from '.';

export interface JurusanModel {
  id: string;
  nama_jurusan: string;
  list_mahasiswa: MahasiswaModel[];
  total_mahasiswa: number;
  list_matakuliah: MataKuliahModel[];
  total_matakuliah: number;
}
