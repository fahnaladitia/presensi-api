import { Admin } from '@prisma/client';

import { AdminModel } from 'src/database/model';

export function adminPrismaToModel(admin: Admin): AdminModel {
  const data: AdminModel = {
    id: admin.id,
    email: admin.email,
    alamat: admin.alamat,
    no_hp: admin.no_hp,
    password: admin.password,
    is_active: admin.is_active,
  };
  return data;
}
