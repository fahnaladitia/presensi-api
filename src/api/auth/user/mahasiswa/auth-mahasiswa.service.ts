import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { AuthChangePasswordDto, AuthMahasiswaLoginDto } from '../../dto';
import { exclude } from 'src/common/utils/data-manipulation';
import * as moment from 'moment';
import {
  AccountIsInactiveException,
  AccountNotFoundException,
  NewPasswordAndConfirmPasswordNotMatchException,
  PasswordAndNewPasswordAlreadySameException,
  WrongImeiException,
  WrongPasswordException,
} from 'src/common/exception';
import { MahasiswaModel } from 'src/database/model';
import { MahasiswaRepository } from 'src/database/repository';
import { Mahasiswa } from '@prisma/client';

@Injectable()
export class AuthMahasiswaService {
  constructor(
    private readonly repository: MahasiswaRepository,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: AuthMahasiswaLoginDto) {
    // cari mahasiswa dengan email atau nim
    const mahasiswa = !dto.email
      ? await this.repository.findOneByNIM(dto.nim)
      : await this.repository.findOneByEmail(dto.email);

    // cek jika tidak ada mahasiswa throw  AccountNotFoundException
    if (!mahasiswa) throw new AccountNotFoundException();

    const pwMatches = await this.verifyPassword(
      mahasiswa.password,
      dto.password,
    );

    // jika tidak match throw WrongPasswordException
    if (!pwMatches) throw new WrongPasswordException();

    // jika data imei mahasiswa tidak sama throw WrongImeiException
    if (mahasiswa.imei !== dto.imei) throw new WrongImeiException();

    // jika data mahasiswa is_active = false throw AccountIsInactiveException
    if (!mahasiswa.is_active) throw new AccountIsInactiveException();

    const model: MahasiswaModel = {
      id: mahasiswa.id,
      email: mahasiswa.email,
      nim: mahasiswa.nim,
      nama: mahasiswa.nama,
      ttl: moment(mahasiswa.ttl).format('DD-MM-YYYY'),
      password: mahasiswa.password,
      alamat: mahasiswa.alamat,
      no_hp: mahasiswa.no_hp,
      is_active: mahasiswa.is_active,
      angkatan: mahasiswa.angkatan.angkatan,
      jurusan: mahasiswa.jurusan.nama_jurusan,
      imei: mahasiswa.imei,
    };

    return exclude(model, 'password');
  }

  async signToken(data: any) {
    const secret = this.config.get<string>('JWT_SECRET');

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '1d',
      secret: secret,
    });

    return accessToken;
  }

  async changePassword(mahasiswa: Mahasiswa, dto: AuthChangePasswordDto) {
    // jika data mahasiswa is_active = false throw AccountIsInactiveException
    if (!mahasiswa.is_active) throw new AccountIsInactiveException();

    // membuat variable untuk menentukan jika 2 field password input sama atau tidak
    const confirmPasswordMatch = dto.new_password === dto.confirm_password;

    // cek confirmasi password tidak match throw  NewPasswordAndConfirmPasswordNotMatchException
    if (!confirmPasswordMatch)
      throw new NewPasswordAndConfirmPasswordNotMatchException();

    const verifyOldPassword = await this.verifyPassword(
      mahasiswa.password,
      dto.old_password,
    );

    if (!verifyOldPassword) throw new WrongPasswordException();

    // membuat variable untuk menentukan jika password yang ada dan password baru sama tidak
    const isSamePassword = await this.verifyPassword(
      mahasiswa.password,
      dto.new_password,
    );

    // jika password baru sama dengan password
    // saat yang ada throw PasswordAndNewPasswordAlreadySameException
    if (isSamePassword) throw new PasswordAndNewPasswordAlreadySameException();

    // membuat hash untuk password baru
    const hash = await argon.hash(dto.new_password);

    // update data di database dengan mencari id mahasiswa
    // selanjutnya mengubah passwordnya dengan hash yang telah dibuat
    const result = await this.repository.updatePassword(mahasiswa.id, hash);

    const model: MahasiswaModel = {
      id: result.id,
      email: result.email,
      nim: result.nim,
      nama: result.nama,
      ttl: moment(result.ttl).format('DD-MMM-YYYY'),
      password: result.password,
      alamat: result.alamat,
      no_hp: result.no_hp,
      is_active: result.is_active,
      angkatan: result.angkatan.angkatan,
      jurusan: result.jurusan.nama_jurusan,
      imei: result.imei,
    };

    return exclude(model, 'password');
  }

  async verifyPassword(
    currentPassword: string,
    inputPassword: string,
  ): Promise<boolean> {
    // cek jika account mahasiswa masih menggunakan password default
    let verify: boolean;
    if (currentPassword === 'password') {
      // cek jika password sama dengan yang diinput yang menggunakan password default
      verify = currentPassword === inputPassword;
    } else {
      // cek jika password sama dengan yang diinput yang menggunakan password Hash argon2
      verify = await argon.verify(currentPassword, inputPassword);
    }
    return verify;
  }
}
