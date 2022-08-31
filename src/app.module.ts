import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthAdminModule } from './api/auth/user/admin/auth-admin.module';
import { AuthMahasiswaModule } from './api/auth/user/mahasiswa/auth-mahasiswa.module';

import { LogsMiddleware } from './common/middleware';

import { PrismaModule } from './database/prisma/prisma.module';
import { AuthDosenModule } from './api/auth/user/dosen/auth-dosen.module';
import { ProgramStudiModule } from './api/program_studi/program-studi.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthMahasiswaModule,
    AuthDosenModule,
    AuthAdminModule,
    ProgramStudiModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
