/*
  Warnings:

  - Made the column `dosen_id` on table `MataKuliah` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "GelarAkademik" AS ENUM ('S1', 'S2', 'D3', 'D4');

-- CreateEnum
CREATE TYPE "TipeKelas" AS ENUM ('REGULER', 'INTER');

-- DropForeignKey
ALTER TABLE "MataKuliah" DROP CONSTRAINT "MataKuliah_dosen_id_fkey";

-- AlterTable
ALTER TABLE "Kelas" ADD COLUMN     "tipe_kelas" "TipeKelas" NOT NULL DEFAULT 'REGULER';

-- AlterTable
ALTER TABLE "Mahasiswa" ADD COLUMN     "gelar_akademik" "GelarAkademik" NOT NULL DEFAULT 'S1';

-- AlterTable
ALTER TABLE "MataKuliah" ALTER COLUMN "dosen_id" SET NOT NULL;

-- CreateTable
CREATE TABLE "GerbangQRCode" (
    "id" TEXT NOT NULL,
    "qr_code_text" TEXT NOT NULL,
    "is_used" BOOLEAN NOT NULL DEFAULT false,
    "mahasiswa_id" TEXT NOT NULL,
    "jam_dipakai" TIMESTAMP(3),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "GerbangQRCode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GerbangQRCode" ADD CONSTRAINT "GerbangQRCode_mahasiswa_id_fkey" FOREIGN KEY ("mahasiswa_id") REFERENCES "Mahasiswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MataKuliah" ADD CONSTRAINT "MataKuliah_dosen_id_fkey" FOREIGN KEY ("dosen_id") REFERENCES "Dosen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
