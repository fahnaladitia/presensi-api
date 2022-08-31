import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SuccessDto } from 'src/common/global-dto';
import { JwtAdminGuard } from '../auth/guard';
import { AdminRoutes } from '../routes';
import { CreateProgramStudiDto, UpdateProgramStudiDto } from './dto';
import { ProgramStudiService } from './program-studi.service';

@Controller(AdminRoutes.PROGRAM_STUDI_CONTROLLER)
export class ProgramStudiController {
  constructor(private readonly service: ProgramStudiService) {}

  @UseGuards(JwtAdminGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllProgramStudi() {
    const response = new SuccessDto();
    const data = await this.service.getAll();
    response.data = data;
    response.total = data.length;

    return response;
  }

  @UseGuards(JwtAdminGuard)
  @Get(AdminRoutes.ID)
  @HttpCode(HttpStatus.OK)
  async getOneProgramStudi(@Param('id') id: string) {
    const response = new SuccessDto();
    const data = await this.service.getOneById(id);
    response.data = data;

    return response;
  }

  @UseGuards(JwtAdminGuard)
  @Post(AdminRoutes.CREATE)
  @HttpCode(HttpStatus.CREATED)
  async createProgramStudi(@Body() dto: CreateProgramStudiDto) {
    const response = new SuccessDto();
    const data = await this.service.createProgramStudi(dto);
    response.data = data;

    return response;
  }

  @UseGuards(JwtAdminGuard)
  @Patch(AdminRoutes.ID)
  @HttpCode(HttpStatus.OK)
  async updateProgramStudi(
    @Param('id') id: string,
    @Body() dto: UpdateProgramStudiDto,
  ) {
    const response = new SuccessDto();
    const data = await this.service.updateProgramStudi(id, dto);
    response.data = data;

    return response;
  }

  @UseGuards(JwtAdminGuard)
  @Delete(AdminRoutes.ID)
  @HttpCode(HttpStatus.OK)
  async deleteProgramStudi(@Param('id') id: string) {
    const response = new SuccessDto();
    const data = await this.service.deleteProgramStudi(id);
    response.data = data;

    return response;
  }
}
