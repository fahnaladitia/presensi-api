/*
  Warnings:

  - You are about to drop the column `gelar_academik_id` on the `Mahasiswa` table. All the data in the column will be lost.
  - You are about to drop the `GelarAkademik` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Mahasiswa" DROP CONSTRAINT "Mahasiswa_gelar_academik_id_fkey";

-- AlterTable
ALTER TABLE "Mahasiswa" DROP COLUMN "gelar_academik_id";

-- DropTable
DROP TABLE "GelarAkademik";
