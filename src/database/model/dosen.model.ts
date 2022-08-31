export interface DosenModel {
  id: string;
  email: string;
  nip: string;
  password: string;
  alamat: string | null;
  ttl: string | null;
  no_hp: string | null;
  is_active: boolean;
}
