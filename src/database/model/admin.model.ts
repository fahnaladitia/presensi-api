export interface AdminModel {
  id: string;
  email: string;
  alamat: string | null;
  no_hp: string | null;
  password: string;
  is_active: boolean;
}
