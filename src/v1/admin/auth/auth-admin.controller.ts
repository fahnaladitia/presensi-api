import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Admin } from '@prisma/client';
import { AuthChangePasswordDto, AuthResponseDto } from 'src/v1/global-dto';
import { AdminRoutes } from 'src/v1/routes';
import { AuthAdminService } from './auth-admin.service';
import { GetAdmin } from './decorator';
import { AuthLoginDto, AuthSignupDto } from './dto';
import { JwtAdminGuard } from './guard';

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

  @Post(AdminRoutes.LOGIN)
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: AuthLoginDto) {
    const response = new AuthResponseDto();

    const data = await this.service.login(dto);

    const accessToken = await this.service.signToken(data);

    response.data = data;
    response.access_token = accessToken;

    return response;
  }

  @UseGuards(JwtAdminGuard)
  @Patch(AdminRoutes.CHANGE_PASSWORD)
  @HttpCode(HttpStatus.ACCEPTED)
  async changePassword(
    @GetAdmin() admin: Admin,
    @Body() dto: AuthChangePasswordDto,
  ) {
    const response = new AuthResponseDto();

    const data = await this.service.changePassword(admin, dto);

    const accessToken = await this.service.signToken(data);

    response.data = data;
    response.access_token = accessToken;

    return response;
  }
}
