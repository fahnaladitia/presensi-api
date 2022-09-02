import { Injectable } from '@nestjs/common';
import { ProgramStudiRepository } from 'src/database/repository';
import { CreateProgramStudiDto, UpdateProgramStudiDto } from './dto';

@Injectable()
export class ProgramStudiService {
  constructor(private readonly repository: ProgramStudiRepository) {}

  async getAll() {
    return this.repository.getAll();
  }

  async getOneById(id: string) {
    const jurusan = await this.repository.getOneById(id);
    return jurusan;
  }

  async createProgramStudi(dto: CreateProgramStudiDto) {
    return this.repository.createProgramStudi(dto.nama);
  }

  async updateProgramStudi(id: string, dto: UpdateProgramStudiDto) {
    return this.repository.updateNameProgramStudiById(id, dto.nama);
  }

  async deleteProgramStudi(id: string) {
    return this.repository.deleteProgramStudiById(id);
  }
}
