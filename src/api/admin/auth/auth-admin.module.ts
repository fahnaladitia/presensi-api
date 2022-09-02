import { Module } from '@nestjs/common';
import { AuthAdminService } from './auth-admin.service';
import { AuthAdminController } from './auth-admin.controller';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AdminRepository } from 'src/database/repository';
import { JwtAdminStrategy } from './strategy';

@Module({
  imports: [PassportModule, JwtModule.register({})],
  providers: [AuthAdminService, AdminRepository, JwtAdminStrategy],
  controllers: [AuthAdminController],
})
export class AuthAdminModule {}
