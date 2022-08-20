/*
  Warnings:

  - You are about to drop the `JurusanMahasiswa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "JurusanMahasiswa" DROP CONSTRAINT "JurusanMahasiswa_jurusan_id_fkey";

-- DropForeignKey
ALTER TABLE "JurusanMahasiswa" DROP CONSTRAINT "JurusanMahasiswa_mahasiswa_id_fkey";

-- DropTable
DROP TABLE "JurusanMahasiswa";
