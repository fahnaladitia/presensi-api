import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AdminRepository } from '../repository';

@Injectable()
export class AuthAdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
}
