import { Module } from '@nestjs/common';
import { AuthAdminService } from './auth-admin.service';
import { AuthAdminController } from './auth-admin.controller';
import { AdminRepository } from '../repository/admin.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthAdminService, AdminRepository],
  controllers: [AuthAdminController],
})
export class AuthAdminModule {}
