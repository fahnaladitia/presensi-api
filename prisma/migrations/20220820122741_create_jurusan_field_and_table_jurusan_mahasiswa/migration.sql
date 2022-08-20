/*
  Warnings:

  - Added the required column `jurusan_id` to the `Mahasiswa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mahasiswa" ADD COLUMN     "jurusan_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "JurusanMahasiswa" (
    "jurusan_id" TEXT NOT NULL,
    "mahasiswa_id" TEXT NOT NULL,

    CONSTRAINT "JurusanMahasiswa_pkey" PRIMARY KEY ("jurusan_id","mahasiswa_id")
);

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_jurusan_id_fkey" FOREIGN KEY ("jurusan_id") REFERENCES "Jurusan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JurusanMahasiswa" ADD CONSTRAINT "JurusanMahasiswa_jurusan_id_fkey" FOREIGN KEY ("jurusan_id") REFERENCES "Jurusan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JurusanMahasiswa" ADD CONSTRAINT "JurusanMahasiswa_mahasiswa_id_fkey" FOREIGN KEY ("mahasiswa_id") REFERENCES "Mahasiswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
