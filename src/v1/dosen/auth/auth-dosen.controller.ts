import { Controller } from '@nestjs/common';
import { DosenRoutes } from 'src/v1/routes';
import { AuthDosenService } from './auth-dosen.service';

@Controller(DosenRoutes.AUTH_CONTROLLER)
export class AuthDosenController {
  constructor(private readonly service: AuthDosenService) {}
}
