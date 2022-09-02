import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LogsMiddleware } from './common/middleware';
import { PrismaModule } from './database/prisma/prisma.module';
import { ProgramStudiModule } from './api/admin/program_studi/program-studi.module';
import { AuthAdminModule } from './api/admin/auth/auth-admin.module';
import { AuthDosenModule } from './api/dosen/auth/auth-dosen.module';
import { AuthMahasiswaModule } from './api/mahasiswa/auth/auth-mahasiswa.module';

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
