/*
  Warnings:

  - You are about to drop the column `jadwal_matakuliah_id` on the `Absensi` table. All the data in the column will be lost.
  - You are about to drop the `JadwalMataKuliah` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `matakuliah_kelas_jadwal_id` to the `Absensi` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Absensi" DROP CONSTRAINT "Absensi_jadwal_matakuliah_id_fkey";

-- DropForeignKey
ALTER TABLE "JadwalMataKuliah" DROP CONSTRAINT "JadwalMataKuliah_matakuliah_id_fkey";

-- AlterTable
ALTER TABLE "Absensi" DROP COLUMN "jadwal_matakuliah_id",
ADD COLUMN     "matakuliah_kelas_jadwal_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "JadwalMataKuliah";

-- CreateTable
CREATE TABLE "MataKuliahKelasJadwal" (
    "id" TEXT NOT NULL,
    "kelas_jadwal_id" TEXT NOT NULL,
    "matakuliah_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "MataKuliahKelasJadwal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jadwal" (
    "id" TEXT NOT NULL,
    "tanggal" TIMESTAMPTZ NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Jadwal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KelasJadwal" (
    "id" TEXT NOT NULL,
    "kelas_id" TEXT NOT NULL,
    "jadwal_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "KelasJadwal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MataKuliahKelasJadwal" ADD CONSTRAINT "MataKuliahKelasJadwal_kelas_jadwal_id_fkey" FOREIGN KEY ("kelas_jadwal_id") REFERENCES "KelasJadwal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MataKuliahKelasJadwal" ADD CONSTRAINT "MataKuliahKelasJadwal_matakuliah_id_fkey" FOREIGN KEY ("matakuliah_id") REFERENCES "MataKuliah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KelasJadwal" ADD CONSTRAINT "KelasJadwal_kelas_id_fkey" FOREIGN KEY ("kelas_id") REFERENCES "Kelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KelasJadwal" ADD CONSTRAINT "KelasJadwal_jadwal_id_fkey" FOREIGN KEY ("jadwal_id") REFERENCES "Jadwal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_matakuliah_kelas_jadwal_id_fkey" FOREIGN KEY ("matakuliah_kelas_jadwal_id") REFERENCES "MataKuliahKelasJadwal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
