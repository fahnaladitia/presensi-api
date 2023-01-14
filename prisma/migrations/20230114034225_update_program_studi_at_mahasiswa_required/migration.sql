/*
  Warnings:

  - Made the column `program_studi_id` on table `Mahasiswa` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Mahasiswa" DROP CONSTRAINT "Mahasiswa_program_studi_id_fkey";

-- AlterTable
ALTER TABLE "Mahasiswa" ALTER COLUMN "program_studi_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_program_studi_id_fkey" FOREIGN KEY ("program_studi_id") REFERENCES "ProgramStudi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
