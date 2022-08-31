import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { DosenRepository } from 'src/database/repository';
import { JwtNameStrategy } from 'src/common/utils';
import { AccountIsInactiveException } from 'src/common/exception';

@Injectable()
export class JwtDosenStrategy extends PassportStrategy(
  Strategy,
  JwtNameStrategy.ADMIN,
) {
  constructor(private repository: DosenRepository, config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { id: string }) {
    const dosen = await this.repository.findOneById(payload.id);
    if (!dosen.is_active) throw new AccountIsInactiveException();
    return dosen;
  }
}
