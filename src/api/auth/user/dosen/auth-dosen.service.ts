import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  AccountIsInactiveException,
  AccountNotFoundException,
  NewPasswordAndConfirmPasswordNotMatchException,
  PasswordAndNewPasswordAlreadySameException,
  WrongPasswordException,
} from 'src/common/exception';
import { DosenRepository } from 'src/database/repository';
import { AuthChangePasswordDto, AuthDosenLoginDto } from '../../dto';
import * as argon from 'argon2';
import { exclude } from 'src/common/utils';
import { Dosen } from '@prisma/client';

@Injectable()
export class AuthDosenService {
  constructor(
    private readonly repository: DosenRepository,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: AuthDosenLoginDto) {
    const dosen = !dto.email
      ? await this.repository.findOneByEmail(dto.nip)
      : await this.repository.findOneByNIP(dto.nip);

    if (!dosen) throw new AccountNotFoundException();

    const pwMatches = await this.verifyPassword(dosen.password, dto.password);

    if (!pwMatches) throw new WrongPasswordException();

    if (!dosen.is_active) throw new AccountIsInactiveException();

    const dosenAfterDataManipulated = exclude(
      dosen,
      'password',
      'created_at',
      'updated_at',
    );
    return dosenAfterDataManipulated;
  }

  async signToken(data: any) {
    const secret = this.config.get<string>('JWT_SECRET');

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '1d',
      secret: secret,
    });
    return accessToken;
  }

  async changePassword(dosen: Dosen, dto: AuthChangePasswordDto) {
    if (!dosen.is_active) throw new AccountIsInactiveException();

    const confirmPasswordMatch = dto.new_password === dto.confirm_password;

    if (!confirmPasswordMatch)
      throw new NewPasswordAndConfirmPasswordNotMatchException();

    const verifyOldPassword = await this.verifyPassword(
      dosen.password,
      dto.old_password,
    );
    if (!verifyOldPassword) throw new WrongPasswordException();

    const isSamePassword = await this.verifyPassword(
      dosen.password,
      dto.new_password,
    );

    if (isSamePassword) throw new PasswordAndNewPasswordAlreadySameException();

    const hash = await argon.hash(dto.new_password);

    const result = await this.repository.updatePassword(dosen.id, hash);

    const dosenAfterDataManipulated = exclude(
      result,
      'password',
      'created_at',
      'updated_at',
    );
    return dosenAfterDataManipulated;
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
