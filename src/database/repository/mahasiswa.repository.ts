import { Injectable } from '@nestjs/common';
import { AccountNotFoundException } from 'src/common/exception';
import { mahasiswaPrismaToModel } from 'src/common/mapper';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class MahasiswaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: string) {
    const mahasiswa = await this.prisma.mahasiswa.findFirst({
      where: { id },
      include: {
        angkatan: {
          select: {
            angkatan: true,
          },
        },
        program_studi: {
          select: {
            nama_prodi: true,
          },
        },
      },
    });
    if (!mahasiswa) throw new AccountNotFoundException();
    return mahasiswaPrismaToModel(mahasiswa);
  }

  async findOneByEmail(email: string) {
    const mahasiswa = await this.prisma.mahasiswa.findFirst({
      where: { email },
      include: {
        angkatan: {
          select: {
            angkatan: true,
          },
        },
        program_studi: {
          select: {
            nama_prodi: true,
          },
        },
      },
    });
    if (!mahasiswa) throw new AccountNotFoundException();
    return mahasiswaPrismaToModel(mahasiswa);
  }

  async findOneByNIM(nim: string) {
    const mahasiswa = await this.prisma.mahasiswa.findFirst({
      where: { nim },
      include: {
        angkatan: {
          select: {
            angkatan: true,
          },
        },
        program_studi: {
          select: {
            nama_prodi: true,
          },
        },
      },
    });
    if (!mahasiswa) throw new AccountNotFoundException();
    return mahasiswaPrismaToModel(mahasiswa);
  }

  async updatePassword(id: string, password: string) {
    await this.findOneById(id);
    const mahasiswa = await this.prisma.mahasiswa.update({
      where: { id },
      data: { password },
      include: {
        angkatan: {
          select: {
            angkatan: true,
          },
        },
        program_studi: {
          select: {
            nama_prodi: true,
          },
        },
      },
    });

    return mahasiswaPrismaToModel(mahasiswa);
  }
}
