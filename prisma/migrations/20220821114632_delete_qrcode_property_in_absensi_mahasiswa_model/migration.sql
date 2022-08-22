/*
  Warnings:

  - You are about to drop the column `qr_code` on the `AbsensiMahasiswa` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AbsensiMahasiswa" DROP CONSTRAINT "AbsensiMahasiswa_absensi_id_qr_code_fkey";

-- DropIndex
DROP INDEX "Absensi_id_qr_code_key";

-- DropIndex
DROP INDEX "AbsensiMahasiswa_absensi_id_key";

-- DropIndex
DROP INDEX "AbsensiMahasiswa_qr_code_key";

-- AlterTable
ALTER TABLE "AbsensiMahasiswa" DROP COLUMN "qr_code";

-- AddForeignKey
ALTER TABLE "AbsensiMahasiswa" ADD CONSTRAINT "AbsensiMahasiswa_absensi_id_fkey" FOREIGN KEY ("absensi_id") REFERENCES "Absensi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
