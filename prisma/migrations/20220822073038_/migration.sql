/*
  Warnings:

  - You are about to drop the column `qr_code` on the `Absensi` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Absensi_qr_code_key";

-- AlterTable
ALTER TABLE "Absensi" DROP COLUMN "qr_code";

-- CreateTable
CREATE TABLE "QrCodeWindow" (
    "id" TEXT NOT NULL,
    "absensi_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "QrCodeWindow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QrCodeWindow_absensi_id_key" ON "QrCodeWindow"("absensi_id");

-- AddForeignKey
ALTER TABLE "QrCodeWindow" ADD CONSTRAINT "QrCodeWindow_absensi_id_fkey" FOREIGN KEY ("absensi_id") REFERENCES "Absensi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
