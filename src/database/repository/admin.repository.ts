import { Injectable } from '@nestjs/common';
import {
  AccountNotFoundException,
  EmailAlreadyExistsException,
} from 'src/common/exception';
import { adminPrismaToModel } from 'src/common/mapper';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AdminModel } from '../model';

@Injectable()
export class AdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: string): Promise<AdminModel> {
    const admin = await this.prisma.admin.findFirst({
      where: { id },
    });
    if (!admin) throw new AccountNotFoundException();

    return adminPrismaToModel(admin);
  }

  async findOneByEmail(email: string): Promise<AdminModel> {
    const admin = await this.prisma.admin.findFirst({
      where: { email },
    });
    if (!admin) throw new AccountNotFoundException();
    return adminPrismaToModel(admin);
  }

  async createAdmin(email: string): Promise<AdminModel> {
    const isExists = await this.prisma.admin.findFirst({
      where: { email },
    });
    if (isExists) throw new EmailAlreadyExistsException();
    const admin = await this.prisma.admin.create({
      data: { email },
    });

    return adminPrismaToModel(admin);
  }

  async updatePasswordAdmin(id: string, password: string): Promise<AdminModel> {
    const admin = await this.prisma.admin.update({
      where: { id },
      data: { password },
    });
    return adminPrismaToModel(admin);
  }
}
