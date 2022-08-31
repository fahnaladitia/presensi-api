import { Dosen } from '@prisma/client';
import * as moment from 'moment';
import { DosenModel } from 'src/database/model';

export function dosenPrismaToModel(dosen: Dosen): DosenModel {
  const data: DosenModel = {
    id: dosen.id,
    email: dosen.email,
    nip: dosen.nip,
    password: dosen.password,
    alamat: dosen.alamat,
    ttl: moment(dosen.ttl).format('DD-MM-YYYY'),
    no_hp: dosen.no_hp,
    is_active: dosen.is_active,
  };
  return data;
}
