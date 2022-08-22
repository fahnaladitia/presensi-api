import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthMahasiswaModule } from './mahasiswa/auth-mahasiswa/auth-mahasiswa.module';
import { AuthDosenModule } from './dosen/auth-dosen/auth-dosen.module';
import { AuthAdminModule } from './admin/auth-admin/auth-admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthMahasiswaModule,
    AuthDosenModule,
    AuthAdminModule,
  ],
})
export class AppModule {}
