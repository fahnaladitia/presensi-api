import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthResponseDto } from 'src/v1/global-dto';
import { AdminRoutes } from 'src/v1/routes';
import { AuthAdminService } from './auth-admin.service';
import { AuthSignupDto } from './dto';

@Controller(AdminRoutes.AUTH_CONTROLLER)
export class AuthAdminController {
  constructor(private readonly service: AuthAdminService) {}

  @Post(AdminRoutes.SIGNUP)
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() dto: AuthSignupDto) {
    const response = new AuthResponseDto();
    const data = await this.service.signup(dto);

    response.data = data;

    return response;
  }
}
