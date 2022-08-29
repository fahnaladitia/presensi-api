import { Module } from '@nestjs/common';
import { AuthAdminService } from './auth-admin.service';
import { AuthAdminController } from './auth-admin.controller';
import { AdminRepository } from '../repository/admin.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAdminStrategy } from './strategy';

@Module({
  imports: [PassportModule, JwtModule.register({})],
  providers: [AuthAdminService, AdminRepository, JwtAdminStrategy],
  controllers: [AuthAdminController],
})
export class AuthAdminModule {}
