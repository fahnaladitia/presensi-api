-- DropForeignKey
ALTER TABLE "GerbangQRCode" DROP CONSTRAINT "GerbangQRCode_mahasiswa_id_fkey";

-- AlterTable
ALTER TABLE "GerbangQRCode" ALTER COLUMN "mahasiswa_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "GerbangQRCode" ADD CONSTRAINT "GerbangQRCode_mahasiswa_id_fkey" FOREIGN KEY ("mahasiswa_id") REFERENCES "Mahasiswa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
