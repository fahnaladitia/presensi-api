import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthMahasiswaController } from './auth-mahasiswa.controller';
import { AuthMahasiswaService } from './auth-mahasiswa.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthMahasiswaController],
  providers: [AuthMahasiswaService],
})
export class AuthMahasiswaModule {}
