import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto, SuccessDto } from 'src/global-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import {
  CHANGE_PASSWORD_DEFAULT_EXCEPTION,
  MAHASISWA_IS_INACTIVE,
  MAHASISWA_NOT_FOUND_EXCEPTION,
  NEW_PASSWORD_AND_CONFIRM_PASSWORD_NOT_MATCH,
  PASSWORD_AND_NEW_PASSWORD_ALREADY_SAME,
  WRONG_IMEI_EXCEPTION,
  WRONG_PASSWORD_EXCEPTION,
} from 'src/utils/text-constants.exception';
import { AuthChangePasswordDto, AuthLoginDto } from './dto';
import { exclude } from 'src/utils/data-manipulation';

@Injectable()
export class AuthMahasiswaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: AuthLoginDto) {
    console.log(dto);

    // cari mahasiswa dengan email atau nim
    const mahasiswa = await this.prisma.mahasiswa.findFirst({
      where: {
        email: dto.email,
        nim: dto.nim,
      },
      include: {
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
    });
    // cek jika tidak ada mahasiswa throw  MAHASISWA_NOT_FOUND_EXCEPTION
    if (!mahasiswa) throw new NotFoundException(MAHASISWA_NOT_FOUND_EXCEPTION);

    let pwMatches: boolean;
    // cek jika account mahasiswa masih menggunakan password default
    if (mahasiswa.password === 'password') {
      // cek jika password sama dengan yang diinput yang menggunakan password default
      pwMatches = dto.password === mahasiswa.password;
      // jika match throw CHANGE_PASSWORD_DEFAULT_EXCEPTION
      if (pwMatches)
        throw new UnauthorizedException(CHANGE_PASSWORD_DEFAULT_EXCEPTION);
    } else {
      // cek jika password sama dengan yang diinput yang menggunakan password Hash argon2
      pwMatches = await argon.verify(mahasiswa.password, dto.password);
    }
    // jika tidak match throw CHANGE_PASSWORD_DEFAULT_EXCEPTION
    if (!pwMatches) throw new UnauthorizedException(WRONG_PASSWORD_EXCEPTION);

    // jika data imei mahasiswa tidak sama throw WRONG_IMEI_EXCEPTION
    if (mahasiswa.imei !== dto.imei)
      throw new UnauthorizedException(WRONG_IMEI_EXCEPTION);

    // jika data mahasiswa is_active = false throw MAHASISWA_IS_INACTIVE
    if (!mahasiswa.is_active)
      throw new UnauthorizedException(MAHASISWA_IS_INACTIVE);

    // delete semua field yang tidak dibutuhkan dengan fungsi exclude
    const mahasiswaAfterDataManipulated = exclude(
      mahasiswa,
      'password',
      'angkatan_id',
      'jurusan_id',
      'created_at',
      'updated_at',
    );
    // buat access token dengan data mahasiswa yang telah di manipulasi
    const accessToken = await this.signToken(mahasiswaAfterDataManipulated);

    // return response data
    return new AuthResponseDto(mahasiswaAfterDataManipulated, accessToken);
  }

  async signToken(mahasiswa: any) {
    const secret = this.config.get<string>('JWT_SECRET');

    const accessToken = await this.jwtService.signAsync(mahasiswa, {
      expiresIn: '1d',
      secret: secret,
    });

    return accessToken;
  }

  async changePassword(dto: AuthChangePasswordDto) {
    // cari mahasiswa dengan email atau nim
    const mahasiswa = await this.prisma.mahasiswa.findFirst({
      where: {
        email: dto.email,
        nim: dto.nim,
      },
    });
    // cek jika tidak ada mahasiswa throw  MAHASISWA_NOT_FOUND_EXCEPTION
    if (!mahasiswa) throw new NotFoundException(MAHASISWA_NOT_FOUND_EXCEPTION);

    // jika data mahasiswa is_active = false throw MAHASISWA_IS_INACTIVE
    if (!mahasiswa.is_active)
      throw new UnauthorizedException(MAHASISWA_IS_INACTIVE);

    // membuat variable untuk menentukan jika 2 field password input sama atau tidak
    const confirmPasswordMatch = dto.new_password === dto.confirm_password;

    // cek confirmasi password tidak match throw  NEW_PASSWORD_AND_CONFIRM_PASSWORD_NOT_MATCH
    if (!confirmPasswordMatch)
      throw new BadRequestException(
        NEW_PASSWORD_AND_CONFIRM_PASSWORD_NOT_MATCH,
      );
    // membuat variable untuk menentukan jika password yang ada dan password baru sama tidak
    const isSamePassword = await argon.verify(
      mahasiswa.password,
      dto.new_password,
    );

    // jika password baru sama dengan password saat yang ada throw  PASSWORD_AND_NEW_PASSWORD_ALREADY_SAME
    if (isSamePassword)
      throw new BadRequestException(PASSWORD_AND_NEW_PASSWORD_ALREADY_SAME);

    // membuat hash untuk password baru
    const hash = await argon.hash(dto.new_password);

    // update data di database dengan mencari id mahasiswa
    // selanjutnya mengubah passwordnya dengan hash yang telah dibuat
    const result = await this.prisma.mahasiswa.update({
      where: {
        id: mahasiswa.id,
      },
      data: {
        password: hash,
      },
    });

    // delete semua field yang tidak dibutuhkan dengan fungsi exclude
    const mahasiswaAfterDataManipulated = exclude(
      result,
      'password',
      'angkatan_id',
      'jurusan_id',
      'created_at',
      'updated_at',
    );
    return new SuccessDto(mahasiswaAfterDataManipulated);
  }
}
