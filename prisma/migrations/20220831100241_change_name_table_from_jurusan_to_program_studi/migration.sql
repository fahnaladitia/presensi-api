/*
  Warnings:

  - You are about to drop the column `jurusan_id` on the `Mahasiswa` table. All the data in the column will be lost.
  - You are about to drop the column `jurusan_id` on the `MataKuliah` table. All the data in the column will be lost.
  - You are about to drop the `Jurusan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `program_studi_id` to the `MataKuliah` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Mahasiswa" DROP CONSTRAINT "Mahasiswa_jurusan_id_fkey";

-- DropForeignKey
ALTER TABLE "MataKuliah" DROP CONSTRAINT "MataKuliah_jurusan_id_fkey";

-- AlterTable
ALTER TABLE "Mahasiswa" DROP COLUMN "jurusan_id",
ADD COLUMN     "program_studi_id" TEXT;

-- AlterTable
ALTER TABLE "MataKuliah" DROP COLUMN "jurusan_id",
ADD COLUMN     "program_studi_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "Jurusan";

-- CreateTable
CREATE TABLE "ProgramStudi" (
    "id" TEXT NOT NULL,
    "nama_prodi" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "ProgramStudi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProgramStudi_nama_prodi_key" ON "ProgramStudi"("nama_prodi");

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_program_studi_id_fkey" FOREIGN KEY ("program_studi_id") REFERENCES "ProgramStudi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MataKuliah" ADD CONSTRAINT "MataKuliah_program_studi_id_fkey" FOREIGN KEY ("program_studi_id") REFERENCES "ProgramStudi"("id") ON DELETE CASCADE ON UPDATE CASCADE;
