/*
  Warnings:

  - Added the required column `nama` to the `Dosen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dosen" ADD COLUMN     "nama" TEXT NOT NULL;
