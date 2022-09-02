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
import { AuthChangePasswordDto, AuthResponseDto } from 'src/common/global-dto';
import { DosenModel } from 'src/database/model';

import { AuthDosenService } from './auth-dosen.service';
import { GetDosen } from './decorator';
import { AuthDosenLoginDto } from './dto';
import { JwtDosenGuard } from './guard';

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
    @GetDosen() dosen: DosenModel,
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
