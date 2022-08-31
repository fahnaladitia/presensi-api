import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminRoutes } from 'src/api/routes';
import { AuthAdminService } from './auth-admin.service';
import {
  AuthAdminLoginDto,
  AuthAdminSignupDto,
  AuthChangePasswordDto,
  AuthResponseDto,
} from '../../dto';
import { JwtAdminGuard } from '../../guard';
import { GetAdmin } from '../../decorator';
import { SuccessDto } from 'src/common/global-dto';
import { AdminModel } from 'src/database/model';

@Controller(AdminRoutes.AUTH_CONTROLLER)
export class AuthAdminController {
  constructor(private readonly service: AuthAdminService) {}

  @Post(AdminRoutes.SIGNUP)
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() dto: AuthAdminSignupDto) {
    const response = new SuccessDto();
    const data = await this.service.signup(dto);

    response.data = data;

    return response;
  }

  @Post(AdminRoutes.LOGIN)
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: AuthAdminLoginDto) {
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
    @GetAdmin() admin: AdminModel,
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
