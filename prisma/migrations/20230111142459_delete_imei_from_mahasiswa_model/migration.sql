/*
  Warnings:

  - You are about to drop the column `imei` on the `Mahasiswa` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Mahasiswa_imei_key";

-- AlterTable
ALTER TABLE "Mahasiswa" DROP COLUMN "imei";
