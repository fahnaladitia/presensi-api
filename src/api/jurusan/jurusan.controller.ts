import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SuccessDto } from 'src/common/global-dto';
import { JwtAdminGuard } from '../auth/guard';
import { AdminRoutes } from '../routes';
import { CreateJurusanDto } from './dto';
import { JurusanService } from './jurusan.service';

@Controller(AdminRoutes.JURUSAN_CONTROLLER)
export class JurusanController {
  constructor(private readonly service: JurusanService) {}

  @UseGuards(JwtAdminGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllJurusan() {
    const response = new SuccessDto();
    const data = await this.service.getAll();
    response.data = data;
    response.total = data.length;

    return response;
  }

  @UseGuards(JwtAdminGuard)
  @Get(AdminRoutes.ID)
  @HttpCode(HttpStatus.OK)
  async getOneJurusan(@Param('id') id: string) {
    const response = new SuccessDto();
    const data = await this.service.getOneById(id.toString());
    response.data = data;

    return response;
  }

  @UseGuards(JwtAdminGuard)
  @Post(AdminRoutes.CREATE)
  @HttpCode(HttpStatus.CREATED)
  async createJurusan(@Body() dto: CreateJurusanDto) {
    const response = new SuccessDto();
    const data = await this.service.createJurusan(dto);
    response.data = data;

    return response;
  }
}
