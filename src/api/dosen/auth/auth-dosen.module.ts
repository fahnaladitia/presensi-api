import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DosenRepository } from 'src/database/repository';

import { AuthDosenController } from './auth-dosen.controller';
import { AuthDosenService } from './auth-dosen.service';
import { JwtDosenStrategy } from './strategy';

@Module({
  imports: [PassportModule, JwtModule.register({})],
  providers: [AuthDosenService, DosenRepository, JwtDosenStrategy],
  controllers: [AuthDosenController],
})
export class AuthDosenModule {}
