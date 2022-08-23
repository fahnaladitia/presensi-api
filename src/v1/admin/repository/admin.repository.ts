import { Injectable } from '@nestjs/common';
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
}
