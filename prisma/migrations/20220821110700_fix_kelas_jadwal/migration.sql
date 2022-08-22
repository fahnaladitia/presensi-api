/*
  Warnings:

  - You are about to drop the column `ruangan_id` on the `MataKuliahKelasJadwal` table. All the data in the column will be lost.
  - Added the required column `ruangan_id` to the `KelasJadwal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MataKuliahKelasJadwal" DROP CONSTRAINT "MataKuliahKelasJadwal_ruangan_id_fkey";

-- AlterTable
ALTER TABLE "KelasJadwal" ADD COLUMN     "ruangan_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MataKuliahKelasJadwal" DROP COLUMN "ruangan_id";

-- AddForeignKey
ALTER TABLE "KelasJadwal" ADD CONSTRAINT "KelasJadwal_ruangan_id_fkey" FOREIGN KEY ("ruangan_id") REFERENCES "Ruangan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
