import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class MahasiswaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: string, include: Prisma.MahasiswaInclude = null) {
    const mahasiswa = await this.prisma.mahasiswa.findFirst({
      where: {
        id,
      },
      include,
    });
    return mahasiswa;
  }

  async findOneByEmail(email: string, include: Prisma.MahasiswaInclude = null) {
    const mahasiswa = await this.prisma.mahasiswa.findFirst({
      where: {
        email,
      },
      include,
    });
    return mahasiswa;
  }

  async findOneByNIM(nim: string, include: Prisma.MahasiswaInclude = null) {
    const mahasiswa = await this.prisma.mahasiswa.findFirst({
      where: {
        nim,
      },
      include,
    });
    return mahasiswa;
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
