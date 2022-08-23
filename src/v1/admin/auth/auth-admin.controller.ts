import { Controller } from '@nestjs/common';
import { AdminRoutes } from 'src/v1/routes';
import { AuthAdminService } from './auth-admin.service';

@Controller(AdminRoutes.AUTH_CONTROLLER)
export class AuthAdminController {
  constructor(private readonly service: AuthAdminService) {}
}
