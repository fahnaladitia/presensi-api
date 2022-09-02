import { Module } from '@nestjs/common';
import { ProgramStudiService } from './program-studi.service';
import { ProgramStudiController } from './program-studi.controller';
import {
  AdminRepository,
  ProgramStudiRepository,
} from 'src/database/repository';
import { JwtAdminStrategy } from '../auth/strategy';

@Module({
  providers: [
    ProgramStudiService,
    ProgramStudiRepository,
    AdminRepository,
    JwtAdminStrategy,
  ],
  controllers: [ProgramStudiController],
})
export class ProgramStudiModule {}
