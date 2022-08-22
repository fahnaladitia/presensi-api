/*
  Warnings:

  - You are about to drop the column `tanggal` on the `Jadwal` table. All the data in the column will be lost.
  - Added the required column `end` to the `Jadwal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `Jadwal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jadwal" DROP COLUMN "tanggal",
ADD COLUMN     "end" TIMESTAMPTZ NOT NULL,
ADD COLUMN     "start" TIMESTAMPTZ NOT NULL;
