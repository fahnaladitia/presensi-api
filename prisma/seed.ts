import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';
const prisma = new PrismaClient();
async function main() {
  await prisma.semester.createMany({
    data: [
      {
        semester: '1',
      },
      {
        semester: '2',
      },
      {
        semester: '3',
      },
      {
        semester: '4',
      },
      {
        semester: '5',
      },
      {
        semester: '6',
      },
      {
        semester: '7',
      },
      {
        semester: '8',
      },
    ],
    skipDuplicates: true,
  });

  const data = new ConfigService();

  const hash = await argon.hash(data.get<string>('PASSWORD_ADMIN'));

  await prisma.admin.create({
    data: {
      email: 'root@admin.com',
      is_active: true,
      password: hash,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
