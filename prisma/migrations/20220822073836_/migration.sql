/*
  Warnings:

  - A unique constraint covering the columns `[qr_code_text]` on the table `AbsensiMahasiswa` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `qr_code_text` to the `AbsensiMahasiswa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AbsensiMahasiswa" ADD COLUMN     "qr_code_text" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AbsensiMahasiswa_qr_code_text_key" ON "AbsensiMahasiswa"("qr_code_text");
