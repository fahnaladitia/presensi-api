import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Mahasiswa } from '@prisma/client';
import { AuthResponseDto } from 'src/v1/global-dto';
import { MahasiswaRoutes } from 'src/v1/routes';
import { AuthMahasiswaService } from './auth-mahasiswa.service';
import { GetMahasiswa } from './decorator';
import { AuthChangePasswordDto, AuthLoginDto } from './dto';
import { JwtMahasiswaGuard } from './guard';

@Controller(MahasiswaRoutes.AUTH_CONTROLLER)
export class AuthMahasiswaController {
  constructor(private readonly authService: AuthMahasiswaService) {}

  @Post(MahasiswaRoutes.LOGIN)
  @HttpCode(HttpStatus.OK)
  async loginMahasiswa(@Body() dto: AuthLoginDto) {
    const response = new AuthResponseDto();

    const data = await this.authService.login(dto);

    const accessToken = await this.authService.signToken(data);

    response.data = data;
    response.access_token = accessToken;

    return response;
  }

  @UseGuards(JwtMahasiswaGuard)
  @Patch(MahasiswaRoutes.CHANGE_PASSWORD)
  @HttpCode(HttpStatus.ACCEPTED)
  async changePasswordMahasiswa(
    @GetMahasiswa() mahasiswa: Mahasiswa,
    @Body() dto: AuthChangePasswordDto,
  ) {
    const response = new AuthResponseDto();

    const data = await this.authService.changePassword(mahasiswa, dto);

    const accessToken = await this.authService.signToken(data);

    response.data = data;
    response.access_token = accessToken;

    return response;
  }
}
