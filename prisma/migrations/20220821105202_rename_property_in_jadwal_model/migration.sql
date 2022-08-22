/*
  Warnings:

  - You are about to drop the column `end` on the `Jadwal` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `Jadwal` table. All the data in the column will be lost.
  - Added the required column `end_time_in_seconds` to the `Jadwal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time_in_seconds` to the `Jadwal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jadwal" DROP COLUMN "end",
DROP COLUMN "start",
ADD COLUMN     "end_time_in_seconds" INTEGER NOT NULL,
ADD COLUMN     "start_time_in_seconds" INTEGER NOT NULL;
