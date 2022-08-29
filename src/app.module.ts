import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthAdminModule } from './v1/admin/auth/auth-admin.module';
import { AuthDosenModule } from './v1/dosen/auth/auth-dosen.module';
import { AuthMahasiswaModule } from './v1/mahasiswa/auth/auth-mahasiswa.module';
import { LogsMiddleware } from './v1/middleware';

import { PrismaModule } from './v1/prisma/prisma.module';

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
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
