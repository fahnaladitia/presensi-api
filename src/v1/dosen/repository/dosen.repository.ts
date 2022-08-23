import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/v1/prisma/prisma.service';

@Injectable()
export class DosenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async signin() {
    return 'Hello World';
  }
}
