import { Injectable } from '@nestjs/common';
import { JurusanRepository } from 'src/database/repository';
import { CreateJurusanDto } from './dto';

@Injectable()
export class JurusanService {
  constructor(private readonly repository: JurusanRepository) {}

  async getAll() {
    return this.repository.getAll();
  }

  async getOneById(id: string) {
    const jurusan = await this.repository.getOneById(id);
    return jurusan;
  }

  async createJurusan(dto: CreateJurusanDto) {
    return this.repository.createJurusan(dto.nama);
  }
}
