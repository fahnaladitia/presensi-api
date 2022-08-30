import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '@prisma/client';
import * as argon from 'argon2';
import {
  AccountIsInactiveException,
  AccountNotFoundException,
  EmailAlreadyExistsException,
  NewPasswordAndConfirmPasswordNotMatchException,
  PasswordAndNewPasswordAlreadySameException,
  WrongPasswordException,
} from 'src/common/exception';

import { AdminRepository } from 'src/database/repository';
import { exclude } from 'src/common/utils';
import {
  AuthAdminLoginDto,
  AuthAdminSignupDto,
  AuthChangePasswordDto,
} from '../../dto';

@Injectable()
export class AuthAdminService {
  constructor(
    private readonly repository: AdminRepository,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: AuthAdminLoginDto) {
    const admin = await this.repository.findOneByEmail(dto.email);

    if (!admin) throw new AccountNotFoundException();

    const pwMatches = await this.verifyPassword(admin.password, dto.password);

    if (!pwMatches) throw new WrongPasswordException();

    if (!admin.is_active) throw new AccountIsInactiveException();

    const adminAfterDataManipulated = exclude(
      admin,
      'password',
      'created_at',
      'updated_at',
    );
    return adminAfterDataManipulated;
  }

  async signup(dto: AuthAdminSignupDto) {
    const already = await this.repository.findOneByEmail(dto.email);

    if (already) throw new EmailAlreadyExistsException();

    const admin = await this.repository.createAdmin(dto.email);

    return exclude(admin, 'password', 'created_at', 'updated_at');
  }

  async signToken(data: any) {
    const secret = this.config.get<string>('JWT_SECRET');

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '1d',
      secret: secret,
    });

    return accessToken;
  }

  async changePassword(admin: Admin, dto: AuthChangePasswordDto) {
    if (!admin.is_active) throw new AccountIsInactiveException();

    const confirmPasswordMatch = dto.new_password === dto.confirm_password;

    if (!confirmPasswordMatch)
      throw new NewPasswordAndConfirmPasswordNotMatchException();

    const verifyOldPassword = await this.verifyPassword(
      admin.password,
      dto.old_password,
    );

    if (!verifyOldPassword) throw new WrongPasswordException();

    const isSamePassword = await argon.verify(admin.password, dto.new_password);

    if (isSamePassword) throw new PasswordAndNewPasswordAlreadySameException();

    const hash = await argon.hash(dto.new_password);

    const result = await this.repository.updatePasswordAdmin(admin.id, hash);

    const adminAfterDataManipulated = exclude(
      result,
      'password',
      'created_at',
      'updated_at',
    );
    return adminAfterDataManipulated;
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
