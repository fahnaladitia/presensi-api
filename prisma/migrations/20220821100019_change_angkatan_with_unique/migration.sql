/*
  Warnings:

  - A unique constraint covering the columns `[angkatan]` on the table `Angkatan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Angkatan_angkatan_key" ON "Angkatan"("angkatan");
