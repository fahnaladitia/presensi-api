import { Module } from '@nestjs/common';
import { JurusanService } from './jurusan.service';
import { JurusanController } from './jurusan.controller';
import { AdminRepository, JurusanRepository } from 'src/database/repository';
import { JwtAdminStrategy } from '../auth/strategy';

@Module({
  providers: [
    JurusanService,
    JurusanRepository,
    AdminRepository,
    JwtAdminStrategy,
  ],
  controllers: [JurusanController],
})
export class JurusanModule {}
