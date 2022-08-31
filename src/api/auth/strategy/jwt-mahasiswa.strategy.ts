import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { MahasiswaRepository } from 'src/database/repository';
import { JwtNameStrategy } from 'src/common/utils';
import { AccountIsInactiveException } from 'src/common/exception';

@Injectable()
export class JwtMahasiswaStrategy extends PassportStrategy(
  Strategy,
  JwtNameStrategy.MAHASISWA,
) {
  constructor(private repository: MahasiswaRepository, config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { id: string }) {
    const mahasiswa = await this.repository.findOneById(payload.id);
    if (!mahasiswa.is_active) throw new AccountIsInactiveException();
    return mahasiswa;
  }
}
