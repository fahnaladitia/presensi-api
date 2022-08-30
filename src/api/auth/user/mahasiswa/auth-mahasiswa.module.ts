import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MahasiswaRepository } from 'src/database/repository';
import { JwtMahasiswaStrategy } from '../../strategy';
import { AuthMahasiswaController } from './auth-mahasiswa.controller';
import { AuthMahasiswaService } from './auth-mahasiswa.service';

@Module({
  imports: [PassportModule, JwtModule.register({})],
  controllers: [AuthMahasiswaController],
  providers: [AuthMahasiswaService, MahasiswaRepository, JwtMahasiswaStrategy],
})
export class AuthMahasiswaModule {}
