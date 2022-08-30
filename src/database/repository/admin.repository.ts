import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class AdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: string) {
    const admin = await this.prisma.admin.findFirst({
      where: {
        id,
      },
    });
    return admin;
  }

  async findOneByEmail(email: string) {
    const admin = await this.prisma.admin.findFirst({
      where: {
        email,
      },
    });
    return admin;
  }

  async createAdmin(email: string) {
    const admin = await this.prisma.admin.create({
      data: {
        email,
        is_active: true,
      },
    });

    return admin;
  }

  async updatePasswordAdmin(id: string, newPassword: string) {
    const admin = await this.prisma.admin.update({
      where: {
        id,
      },
      data: {
        password: newPassword,
      },
    });
    return admin;
  }
}