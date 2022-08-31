import { Injectable } from '@nestjs/common';
import { Dosen } from '@prisma/client';
import { AccountNotFoundException } from 'src/common/exception';
import { dosenPrismaToModel } from 'src/common/mapper';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { DosenModel } from '../model';

@Injectable()
export class DosenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: string): Promise<DosenModel> {
    const dosen = await this.prisma.dosen.findFirst({
      where: { id },
    });
    if (!dosen) throw new AccountNotFoundException();
    return dosenPrismaToModel(dosen);
  }

  async findOneByEmail(email: string): Promise<DosenModel> {
    const dosen = await this.prisma.dosen.findFirst({
      where: { email },
    });
    if (!dosen) throw new AccountNotFoundException();
    return dosenPrismaToModel(dosen);
  }

  async findOneByNIP(nip: string): Promise<DosenModel> {
    const dosen: Dosen = await this.prisma.dosen.findFirst({
      where: { nip },
    });
    if (!dosen) throw new AccountNotFoundException();
    return dosenPrismaToModel(dosen);
  }

  async updatePassword(id: string, password: string): Promise<DosenModel> {
    await this.findOneById(id);
    const dosen = await this.prisma.dosen.update({
      where: { id },
      data: { password },
    });
    if (!dosen) throw new AccountNotFoundException();
    return dosenPrismaToModel(dosen);
  }
}
