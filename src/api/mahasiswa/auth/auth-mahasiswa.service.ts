import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import {
  AccountIsInactiveException,
  NewPasswordAndConfirmPasswordNotMatchException,
  PasswordAndNewPasswordAlreadySameException,
  WrongPasswordException,
} from 'src/common/exception';
import { MahasiswaRepository } from 'src/database/repository';
import { MahasiswaModel } from 'src/database/model';
import { exclude } from 'src/common/utils';
import { AuthMahasiswaLoginDto } from './dto';
import { AuthChangePasswordDto } from 'src/common/global-dto';

@Injectable()
export class AuthMahasiswaService {
  constructor(
    private readonly repository: MahasiswaRepository,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: AuthMahasiswaLoginDto) {
    const mahasiswa = !dto.email
      ? await this.repository.findOneByNIM(dto.nim)
      : await this.repository.findOneByEmail(dto.email);

    const pwMatches = await this.verifyPassword(
      mahasiswa.password,
      dto.password,
    );

    if (!pwMatches) throw new WrongPasswordException();

    if (!mahasiswa.is_active) throw new AccountIsInactiveException();

    return exclude(mahasiswa, 'password');
  }

  async signToken(data: any) {
    const secret = this.config.get<string>('JWT_SECRET');

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '1d',
      secret: secret,
    });

    return accessToken;
  }

  async changePassword(mahasiswa: MahasiswaModel, dto: AuthChangePasswordDto) {
    if (!mahasiswa.is_active) throw new AccountIsInactiveException();

    const confirmPasswordMatch = dto.new_password === dto.confirm_password;

    if (!confirmPasswordMatch)
      throw new NewPasswordAndConfirmPasswordNotMatchException();

    const verifyOldPassword = await this.verifyPassword(
      mahasiswa.password,
      dto.old_password,
    );

    if (!verifyOldPassword) throw new WrongPasswordException();

    const isSamePassword = await this.verifyPassword(
      mahasiswa.password,
      dto.new_password,
    );

    if (isSamePassword) throw new PasswordAndNewPasswordAlreadySameException();

    const hash = await argon.hash(dto.new_password);

    const result = await this.repository.updatePassword(mahasiswa.id, hash);

    return exclude(result, 'password');
  }

  async verifyPassword(
    currentPassword: string,
    inputPassword: string,
  ): Promise<boolean> {
    let verify: boolean;
    if (currentPassword === 'password') {
      verify = currentPassword === inputPassword;
    } else {
      verify = await argon.verify(currentPassword, inputPassword);
    }
    return verify;
  }
}
