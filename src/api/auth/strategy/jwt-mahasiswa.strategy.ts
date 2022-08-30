import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccountNotFoundException } from 'src/common/exception';
import { MahasiswaRepository } from 'src/database/repository';
import { exclude, JwtNameStrategy } from 'src/common/utils';

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
    if (!mahasiswa) throw new AccountNotFoundException();
    return exclude(
      mahasiswa,
      'angkatan_id',
      'jurusan_id',
      'created_at',
      'updated_at',
    );
  }
}
