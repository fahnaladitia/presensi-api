import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { exclude } from 'src/v1/utils';
import { AdminRepository } from '../repository';
import { AuthSignupDto } from './dto';

@Injectable()
export class AuthAdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: AuthSignupDto) {
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
}
