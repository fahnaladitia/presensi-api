import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class MahasiswaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: string) {
    const mahasiswa = await this.prisma.mahasiswa.findFirst({
      where: {
        id,
      },
      include: {
        angkatan: {
          select: {
            angkatan: true,
          },
        },
        jurusan: {
          select: {
            nama_jurusan: true,
          },
        },
      },
    });
    return mahasiswa;
  }

  async findOneByEmail(email: string) {
    const mahasiswa = await this.prisma.mahasiswa.findFirst({
      where: {
        email,
      },
      include: {
        angkatan: {
          select: {
            angkatan: true,
          },
        },
        jurusan: {
          select: {
            nama_jurusan: true,
          },
        },
      },
    });
    return mahasiswa;
  }

  async findOneByNIM(nim: string) {
    const mahasiswa = await this.prisma.mahasiswa.findFirst({
      where: {
        nim,
      },
      include: {
        angkatan: {
          select: {
            angkatan: true,
          },
        },
        jurusan: {
          select: {
            nama_jurusan: true,
          },
        },
      },
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
      include: {
        angkatan: {
          select: {
            angkatan: true,
          },
        },
        jurusan: {
          select: {
            nama_jurusan: true,
          },
        },
      },
    });
    return mahasiswa;
  }
}
