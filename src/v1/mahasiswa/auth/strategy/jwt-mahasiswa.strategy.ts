import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { exclude, JwtNameStrategy } from 'src/v1/utils';
import { MahasiswaRepository } from '../../repository/mahasiswa.repository';

@Injectable()
export class JwtMahasiswaStrategy extends PassportStrategy(
  Strategy,
  JwtNameStrategy.MAHASISWA,
) {
  constructor(
    private mahasiswaRepository: MahasiswaRepository,
    config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { id: string }) {
    const mahasiswa = await this.mahasiswaRepository.findMahasiswaById(
      payload.id,
      {
        angkatan: {
          select: {
            angkatan: true,
          },
        },
        jurusan: {
          select: {
            nama_jurusan: true,
          },
        },
      },
    );
    return exclude(
      mahasiswa,
      'angkatan_id',
      'jurusan_id',
      'created_at',
      'updated_at',
    );
  }
}
