import { Mahasiswa } from '@prisma/client';
import * as moment from 'moment';
import { MahasiswaModel } from 'src/database/model';

export function mahasiswaPrismaToModel(
  mahasiswa: Mahasiswa & {
    angkatan: {
      angkatan: number;
    };
    program_studi: {
      nama_prodi: string;
    };
  },
): MahasiswaModel {
  return <MahasiswaModel>{
    id: mahasiswa.id,
    email: mahasiswa.email,
    nim: mahasiswa.nim,
    nama: mahasiswa.nama,
    password: mahasiswa.password,
    ttl: moment(mahasiswa.ttl).format('DD-MM-YYYY'),
    alamat: mahasiswa.alamat,
    no_hp: mahasiswa.no_hp,
    is_active: mahasiswa.is_active,
    angkatan: mahasiswa.angkatan.angkatan,
    program_studi: mahasiswa.program_studi.nama_prodi,
    imei: mahasiswa.imei,
  };
}
