import { Injectable } from '@nestjs/common';
import { JurusanModel, MahasiswaModel, MataKuliahModel } from '../model';
import { PrismaService } from '../prisma/prisma.service';
import * as moment from 'moment';
import { JurusanNotFoundException } from 'src/common/exception';

@Injectable()
export class JurusanRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const jurusan = await this.prisma.jurusan.findMany({
      include: {
        Mahasiswa: {
          include: {
            angkatan: true,
            jurusan: true,
          },
        },
        MataKuliah: {
          include: {
            jurusan: true,
            semester: true,
          },
        },
      },
    });

    const model: JurusanModel[] = jurusan.map((jurusan) => {
      return <JurusanModel>{
        id: jurusan.id,
        nama_jurusan: jurusan.nama_jurusan,

        list_mahasiswa: jurusan.Mahasiswa.map((mahasiswa) => {
          return <MahasiswaModel>{
            id: mahasiswa.id,
            email: mahasiswa.email,
            nim: mahasiswa.nim,
            nama: mahasiswa.nama,
            ttl: moment(mahasiswa.ttl).format('DD-MM-YYYY'),
            alamat: mahasiswa.alamat,
            no_hp: mahasiswa.no_hp,
            is_active: mahasiswa.is_active,
            angkatan: mahasiswa.angkatan.angkatan,
            jurusan: mahasiswa.jurusan.nama_jurusan,
            imei: mahasiswa.imei,
          };
        }),
        list_matakuliah: jurusan.MataKuliah.map((matakuliah) => {
          return <MataKuliahModel>{
            id: matakuliah.id,
            kode_matakuliah: matakuliah.kode_matakuliah,
            nama_matakuliah: matakuliah.nama_matakuliah,
            sks: matakuliah.sks,
            semester: matakuliah.semester.semester,
            jurusan: matakuliah.jurusan.nama_jurusan,
          };
        }),
        total_mahasiswa: jurusan.Mahasiswa.length,
        total_matakuliah: jurusan.MataKuliah.length,
      };
    });
    return model;
  }

  async getOneByName(
    name: string,
    includeMahasiswa = false,
    includeMataKuliah = false,
  ) {
    return this.prisma.jurusan.findFirst({
      where: {
        nama_jurusan: name,
      },
      include: {
        Mahasiswa: includeMahasiswa,
        MataKuliah: includeMataKuliah,
      },
    });
  }

  async getOneById(id: string) {
    const jurusan = await this.prisma.jurusan.findFirst({
      where: {
        id,
      },
      include: {
        Mahasiswa: {
          include: {
            angkatan: true,
            jurusan: true,
          },
        },
        MataKuliah: {
          include: {
            jurusan: true,
            semester: true,
          },
        },
      },
    });
    if (!jurusan) throw new JurusanNotFoundException();
    return <JurusanModel>{
      id: jurusan.id,
      nama_jurusan: jurusan.nama_jurusan,

      list_mahasiswa: jurusan.Mahasiswa.map((mahasiswa) => {
        return <MahasiswaModel>{
          id: mahasiswa.id,
          email: mahasiswa.email,
          nim: mahasiswa.nim,
          nama: mahasiswa.nama,
          ttl: moment(mahasiswa.ttl).format('DD-MM-YYYY'),
          alamat: mahasiswa.alamat,
          no_hp: mahasiswa.no_hp,
          is_active: mahasiswa.is_active,
          angkatan: mahasiswa.angkatan.angkatan,
          jurusan: mahasiswa.jurusan.nama_jurusan,
          imei: mahasiswa.imei,
        };
      }),
      list_matakuliah: jurusan.MataKuliah.map((matakuliah) => {
        return <MataKuliahModel>{
          id: matakuliah.id,
          kode_matakuliah: matakuliah.kode_matakuliah,
          nama_matakuliah: matakuliah.nama_matakuliah,
          sks: matakuliah.sks,
          semester: matakuliah.semester.semester,
          jurusan: matakuliah.jurusan.nama_jurusan,
        };
      }),
      total_mahasiswa: jurusan.Mahasiswa.length,
      total_matakuliah: jurusan.MataKuliah.length,
    };
  }

  async createJurusan(nama: string) {
    const jurusan = await this.prisma.jurusan.create({
      data: {
        nama_jurusan: nama.toUpperCase(),
      },
    });

    const model: JurusanModel = {
      id: jurusan.id,
      nama_jurusan: jurusan.nama_jurusan,
      list_mahasiswa: [],
      total_mahasiswa: 0,
      list_matakuliah: [],
      total_matakuliah: 0,
    };
    return model;
  }
}
