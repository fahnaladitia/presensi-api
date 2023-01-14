/*
  Warnings:

  - Made the column `gelar_academik_id` on table `Mahasiswa` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Mahasiswa" DROP CONSTRAINT "Mahasiswa_gelar_academik_id_fkey";

-- AlterTable
ALTER TABLE "Mahasiswa" ALTER COLUMN "gelar_academik_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_gelar_academik_id_fkey" FOREIGN KEY ("gelar_academik_id") REFERENCES "GelarAkademik"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
