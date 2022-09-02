import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtNameStrategy } from 'src/common/utils';

@Injectable()
export class JwtDosenGuard extends AuthGuard(JwtNameStrategy.DOSEN) {
  constructor() {
    super();
  }
}
