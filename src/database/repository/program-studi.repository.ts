import { Injectable } from '@nestjs/common';
import { ProgramStudiModel } from '../model';
import { PrismaService } from '../prisma/prisma.service';
import {
  ProgramStudiAlreadyExistsException,
  ProgramStudiNotFoundException,
} from 'src/common/exception';
import {
  programStudiListPrismaToModel,
  programStudiPrismaToModel,
} from 'src/common/mapper';

@Injectable()
export class ProgramStudiRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<ProgramStudiModel[]> {
    const programStudiList = await this.prisma.programStudi.findMany({
      include: {
        Mahasiswa: {
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
        },
        MataKuliah: {
          include: {
            program_studi: {
              select: {
                nama_prodi: true,
              },
            },
            semester: {
              select: {
                semester: true,
              },
            },
          },
        },
      },
    });

    return programStudiListPrismaToModel(programStudiList);
  }

  async getOneByName(name: string): Promise<ProgramStudiModel> {
    const programStudi = await this.prisma.programStudi.findFirst({
      where: { nama_prodi: name.toUpperCase() },
      include: {
        Mahasiswa: {
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
        },
        MataKuliah: {
          include: {
            program_studi: {
              select: {
                nama_prodi: true,
              },
            },
            semester: {
              select: {
                semester: true,
              },
            },
          },
        },
      },
    });
    if (!programStudi) throw new ProgramStudiNotFoundException();
    return programStudiPrismaToModel(programStudi);
  }

  async getOneById(id: string): Promise<ProgramStudiModel> {
    const programStudi = await this.prisma.programStudi.findFirst({
      where: { id },
      include: {
        Mahasiswa: {
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
        },
        MataKuliah: {
          include: {
            program_studi: {
              select: {
                nama_prodi: true,
              },
            },
            semester: {
              select: {
                semester: true,
              },
            },
          },
        },
      },
    });
    if (!programStudi) throw new ProgramStudiNotFoundException();
    return programStudiPrismaToModel(programStudi);
  }

  async createProgramStudi(nama: string): Promise<ProgramStudiModel> {
    const isExists = await this.prisma.programStudi.findFirst({
      where: { nama_prodi: nama.toUpperCase() },
    });
    if (isExists) throw new ProgramStudiAlreadyExistsException();
    const programStudi = await this.prisma.programStudi.create({
      data: { nama_prodi: nama.toUpperCase() },
      include: {
        Mahasiswa: {
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
        },
        MataKuliah: {
          include: {
            program_studi: {
              select: {
                nama_prodi: true,
              },
            },
            semester: {
              select: {
                semester: true,
              },
            },
          },
        },
      },
    });

    return programStudiPrismaToModel(programStudi);
  }

  async updateNameProgramStudiById(
    id: string,
    newName: string,
  ): Promise<ProgramStudiModel> {
    await this.getOneById(id);
    const programStudi = await this.prisma.programStudi.update({
      where: { id },
      data: {
        nama_prodi: newName.toUpperCase(),
      },
      include: {
        Mahasiswa: {
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
        },
        MataKuliah: {
          include: {
            program_studi: {
              select: {
                nama_prodi: true,
              },
            },
            semester: {
              select: {
                semester: true,
              },
            },
          },
        },
      },
    });

    return programStudiPrismaToModel(programStudi);
  }

  async deleteProgramStudiById(id: string): Promise<ProgramStudiModel> {
    await this.getOneById(id);
    const programStudi = await this.prisma.programStudi.delete({
      where: { id },
      include: {
        Mahasiswa: {
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
        },
        MataKuliah: {
          include: {
            program_studi: {
              select: {
                nama_prodi: true,
              },
            },
            semester: {
              select: {
                semester: true,
              },
            },
          },
        },
      },
    });
    return programStudiPrismaToModel(programStudi);
  }
}
