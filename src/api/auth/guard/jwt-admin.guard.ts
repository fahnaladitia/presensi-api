import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtNameStrategy } from 'src/common/utils';

@Injectable()
export class JwtAdminGuard extends AuthGuard(JwtNameStrategy.ADMIN) {
  constructor() {
    super();
  }
}
