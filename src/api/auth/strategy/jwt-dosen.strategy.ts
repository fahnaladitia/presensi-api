import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccountNotFoundException } from 'src/common/exception';

import { DosenRepository } from 'src/database/repository';
import { exclude, JwtNameStrategy } from 'src/common/utils';

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

    if (!dosen) throw new AccountNotFoundException();
    return exclude(dosen, 'created_at', 'updated_at');
  }
}
