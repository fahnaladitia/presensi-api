/*
  Warnings:

  - Made the column `nik` on table `Mahasiswa` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Mahasiswa" ALTER COLUMN "nik" SET NOT NULL;
