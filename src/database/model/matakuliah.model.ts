export interface MataKuliahModel {
  id: string;
  kode_matakuliah: string;
  nama_matakuliah: string;
  sks: number;
  program_studi: string | null;
  semester: string | null;
}
