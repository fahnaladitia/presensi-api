import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DosenRepository } from '../repository';
import { AuthDosenController } from './auth-dosen.controller';
import { AuthDosenService } from './auth-dosen.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthDosenController],
  providers: [AuthDosenService, DosenRepository],
})
export class AuthDosenModule {}
