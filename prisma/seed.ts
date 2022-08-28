import { PrismaClient } from '@prisma/client';
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
