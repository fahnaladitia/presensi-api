import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AdminRepository } from 'src/database/repository';
import { JwtNameStrategy } from 'src/common/utils';
import { AccountIsInactiveException } from 'src/common/exception';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(
  Strategy,
  JwtNameStrategy.ADMIN,
) {
  constructor(private repository: AdminRepository, config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { id: string }) {
    const admin = await this.repository.findOneById(payload.id);
    if (!admin.is_active) throw new AccountIsInactiveException();
    return admin;
  }
}
