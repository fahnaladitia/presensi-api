/*
  Warnings:

  - Added the required column `day_of_week` to the `Jadwal` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `end` on the `Jadwal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `start` on the `Jadwal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Jadwal" ADD COLUMN     "day_of_week" INTEGER NOT NULL,
DROP COLUMN "end",
ADD COLUMN     "end" INTEGER NOT NULL,
DROP COLUMN "start",
ADD COLUMN     "start" INTEGER NOT NULL;
