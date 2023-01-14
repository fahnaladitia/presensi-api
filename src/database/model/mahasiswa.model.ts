import { GelarAkademik } from "@prisma/client";

export interface MahasiswaModel {
  id: string;
  email: string;
  nim: string;
  nik: string;
  nama: string;
  ttl: string;
  password: string;
  alamat: string | null;
  no_hp: string | null;
  is_active: boolean;
  angkatan: number | null;
  program_studi: string | null;
  gelar_akademik: GelarAkademik;
}
