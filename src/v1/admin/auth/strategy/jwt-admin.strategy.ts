import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccountNotFoundException } from 'src/v1/exception';
import { exclude, JwtNameStrategy } from 'src/v1/utils';
import { AdminRepository } from '../../repository';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(
  Strategy,
  JwtNameStrategy.ADMIN,
) {
  constructor(private adminRepository: AdminRepository, config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { id: string }) {
    const admin = await this.adminRepository.findOneAdminById(payload.id);

    if (!admin) throw new AccountNotFoundException();
    return exclude(admin, 'created_at', 'updated_at');
  }
}
