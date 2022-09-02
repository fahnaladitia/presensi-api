import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtNameStrategy } from 'src/common/utils';

@Injectable()
export class JwtMahasiswaGuard extends AuthGuard(JwtNameStrategy.MAHASISWA) {
  constructor() {
    super();
  }
}
