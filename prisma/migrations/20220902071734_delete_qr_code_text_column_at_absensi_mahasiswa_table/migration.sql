/*
  Warnings:

  - You are about to drop the column `qr_code_text` on the `AbsensiMahasiswa` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "AbsensiMahasiswa_qr_code_text_key";

-- AlterTable
ALTER TABLE "AbsensiMahasiswa" DROP COLUMN "qr_code_text";
