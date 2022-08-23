import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/v1/prisma/prisma.service';

@Injectable()
export class MahasiswaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMahasiswaById(id: string, include: Prisma.MahasiswaInclude = null) {
    const mahasiswa = await this.prisma.mahasiswa.findFirst({
      where: {
        id,
      },
      include,
    });
    return mahasiswa;
  }

  async findMahasiswaByEmail(
    email: string,
    include: Prisma.MahasiswaInclude = null,
  ) {
    const mahasiswa = await this.prisma.mahasiswa.findFirst({
      where: {
        email,
      },
      include,
    });
    return mahasiswa;
  }

  async findMahasiswaByNIM(
    nim: string,
    include: Prisma.MahasiswaInclude = null,
  ) {
    const mahasiswa = await this.prisma.mahasiswa.findFirst({
      where: {
        nim,
      },
      include,
    });
    return mahasiswa;
  }

  async updatePasswordMahasiswa(id: string, newPassword: string) {
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
