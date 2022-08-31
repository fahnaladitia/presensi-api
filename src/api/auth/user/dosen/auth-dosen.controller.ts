import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DosenRoutes } from 'src/api/routes';
import { DosenModel } from 'src/database/model';
import { GetAdmin } from '../../decorator';
import {
  AuthChangePasswordDto,
  AuthDosenLoginDto,
  AuthResponseDto,
} from '../../dto';
import { JwtDosenGuard } from '../../guard';
import { AuthDosenService } from './auth-dosen.service';

@Controller(DosenRoutes.AUTH_CONTROLLER)
export class AuthDosenController {
  constructor(private readonly service: AuthDosenService) {}

  @Post(DosenRoutes.LOGIN)
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: AuthDosenLoginDto) {
    const response = new AuthResponseDto();

    const data = await this.service.login(dto);

    const accessToken = await this.service.signToken(data);

    response.data = data;
    response.access_token = accessToken;

    return response;
  }

  @UseGuards(JwtDosenGuard)
  @Patch(DosenRoutes.CHANGE_PASSWORD)
  @HttpCode(HttpStatus.ACCEPTED)
  async changePassword(
    @GetAdmin() dosen: DosenModel,
    @Body() dto: AuthChangePasswordDto,
  ) {
    const response = new AuthResponseDto();
    const data = await this.service.changePassword(dosen, dto);
    const accessToken = await this.service.signToken(data);

    response.data = data;
    response.access_token = accessToken;

    return response;
  }
}
