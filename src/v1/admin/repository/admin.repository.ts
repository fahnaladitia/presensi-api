import { Injectable } from '@nestjs/common';
import { EmailAlreadyExistsException } from 'src/v1/exception';
import { PrismaService } from 'src/v1/prisma/prisma.service';

@Injectable()
export class AdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneAdminByEmail(email: string) {
    const admin = await this.prisma.admin.findFirst({
      where: {
        email,
      },
    });
    return admin;
  }

  async createAdmin(email: string) {
    const already = await this.findOneAdminByEmail(email);

    if (already) throw new EmailAlreadyExistsException();

    const admin = await this.prisma.admin.create({
      data: {
        email,
        is_active: true,
      },
    });

    return admin;
  }
}
