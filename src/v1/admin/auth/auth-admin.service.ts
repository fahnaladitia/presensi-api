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
} from 'src/v1/exception';
import { AuthChangePasswordDto } from 'src/v1/global-dto';
import { exclude } from 'src/v1/utils';
import { AdminRepository } from '../repository';
import { AuthLoginDto, AuthSignupDto } from './dto';

@Injectable()
export class AuthAdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: AuthLoginDto) {
    const admin = await this.adminRepository.findOneAdminByEmail(dto.email);

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

  async signup(dto: AuthSignupDto) {
    const already = await this.adminRepository.findOneAdminByEmail(dto.email);

    if (already) throw new EmailAlreadyExistsException();

    const admin = await this.adminRepository.createAdmin(dto.email);

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

    const result = await this.adminRepository.updatePasswordAdmin(
      admin.id,
      hash,
    );

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
