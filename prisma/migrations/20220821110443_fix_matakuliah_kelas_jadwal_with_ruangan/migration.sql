/*
  Warnings:

  - You are about to drop the column `kelas_id` on the `MataKuliah` table. All the data in the column will be lost.
  - You are about to drop the column `ruangan_id` on the `MataKuliah` table. All the data in the column will be lost.
  - Added the required column `ruangan_id` to the `MataKuliahKelasJadwal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MataKuliah" DROP CONSTRAINT "MataKuliah_kelas_id_fkey";

-- DropForeignKey
ALTER TABLE "MataKuliah" DROP CONSTRAINT "MataKuliah_ruangan_id_fkey";

-- AlterTable
ALTER TABLE "MataKuliah" DROP COLUMN "kelas_id",
DROP COLUMN "ruangan_id";

-- AlterTable
ALTER TABLE "MataKuliahKelasJadwal" ADD COLUMN     "ruangan_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "MataKuliahKelasJadwal" ADD CONSTRAINT "MataKuliahKelasJadwal_ruangan_id_fkey" FOREIGN KEY ("ruangan_id") REFERENCES "Ruangan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
