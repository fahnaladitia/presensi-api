import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthMahasiswaService } from './auth-mahasiswa.service';
import { AuthChangePasswordDto, AuthLoginDto } from './dto';

@Controller('auth/mahasiswa')
export class AuthMahasiswaController {
  constructor(private readonly authService: AuthMahasiswaService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  loginMahasiswa(@Body() dto: AuthLoginDto) {
    return this.authService.login(dto);
  }

  @Patch('/change-password')
  @HttpCode(HttpStatus.ACCEPTED)
  changePasswordMahasiswa(@Body() dto: AuthChangePasswordDto) {
    return this.authService.changePassword(dto);
  }
}
