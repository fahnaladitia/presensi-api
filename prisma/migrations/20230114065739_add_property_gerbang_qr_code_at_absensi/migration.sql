/*
  Warnings:

  - You are about to drop the column `qr_code_text` on the `Absensi` table. All the data in the column will be lost.
  - Added the required column `gerbang_qr_code_id` to the `Absensi` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Absensi_qr_code_text_key";

-- AlterTable
ALTER TABLE "Absensi" DROP COLUMN "qr_code_text",
ADD COLUMN     "gerbang_qr_code_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_gerbang_qr_code_id_fkey" FOREIGN KEY ("gerbang_qr_code_id") REFERENCES "GerbangQRCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
