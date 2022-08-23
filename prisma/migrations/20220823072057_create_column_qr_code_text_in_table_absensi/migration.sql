/*
  Warnings:

  - You are about to drop the `QrCodeWindow` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[qr_code_text]` on the table `Absensi` will be added. If there are existing duplicate values, this will fail.
  - The required column `qr_code_text` was added to the `Absensi` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "QrCodeWindow" DROP CONSTRAINT "QrCodeWindow_absensi_id_fkey";

-- AlterTable
ALTER TABLE "Absensi" ADD COLUMN     "qr_code_text" TEXT NOT NULL;

-- DropTable
DROP TABLE "QrCodeWindow";

-- CreateIndex
CREATE UNIQUE INDEX "Absensi_qr_code_text_key" ON "Absensi"("qr_code_text");
