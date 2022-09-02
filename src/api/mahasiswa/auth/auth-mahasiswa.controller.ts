import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MahasiswaRoutes } from 'src/api/routes';
import { AuthMahasiswaService } from './auth-mahasiswa.service';
import { MahasiswaModel } from 'src/database/model';
import { AuthMahasiswaLoginDto } from './dto';
import { AuthChangePasswordDto, AuthResponseDto } from 'src/common/global-dto';
import { JwtMahasiswaGuard } from './guard';
import { GetMahasiswa } from './decorator';

@Controller(MahasiswaRoutes.AUTH_CONTROLLER)
export class AuthMahasiswaController {
  constructor(private readonly authService: AuthMahasiswaService) {}

  @Post(MahasiswaRoutes.LOGIN)
  @HttpCode(HttpStatus.OK)
  async loginMahasiswa(@Body() dto: AuthMahasiswaLoginDto) {
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
    @GetMahasiswa() mahasiswa: MahasiswaModel,
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
