import { Injectable } from '@nestjs/common';
import { Dosen } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class DosenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: string) {
    const dosen = await this.prisma.dosen.findFirst({
      where: {
        id,
      },
    });
    return dosen;
  }

  async findOneByEmail(email: string) {
    const dosen = await this.prisma.dosen.findFirst({
      where: {
        email,
      },
    });
    return dosen;
  }
  async findOneByNIP(nip: string) {
    const dosen: Dosen = await this.prisma.dosen.findFirst({
      where: {
        nip,
      },
    });
    return dosen;
  }

  async updatePassword(id: string, newPassword: string) {
    const mahasiswa = await this.prisma.mahasiswa.update({
      where: {
        id: id,
      },
      data: {
        password: newPassword,
      },
    });
    return mahasiswa;
  }
}
