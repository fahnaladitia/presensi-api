import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { DosenRepository } from '../repository';

@Injectable()
export class AuthDosenService {
  constructor(
    private readonly dosenRepository: DosenRepository,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login() {
    return this.dosenRepository.signin();
  }
}
