/*
  Warnings:

  - The values [DEFAULT] on the enum `StatusAbsensi` will be removed. If these variants are still used in the database, this will fail.
  - The values [ALPA,TELAT] on the enum `StatusAbsensiMahasiswa` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `batas_jam_masuk` on the `Absensi` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusAbsensi_new" AS ENUM ('BELUM_BUKA', 'BUKA', 'TUTUP');
ALTER TABLE "Absensi" ALTER COLUMN "status_absensi" DROP DEFAULT;
ALTER TABLE "Absensi" ALTER COLUMN "status_absensi" TYPE "StatusAbsensi_new" USING ("status_absensi"::text::"StatusAbsensi_new");
ALTER TYPE "StatusAbsensi" RENAME TO "StatusAbsensi_old";
ALTER TYPE "StatusAbsensi_new" RENAME TO "StatusAbsensi";
DROP TYPE "StatusAbsensi_old";
ALTER TABLE "Absensi" ALTER COLUMN "status_absensi" SET DEFAULT 'BELUM_BUKA';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "StatusAbsensiMahasiswa_new" AS ENUM ('HADIR', 'IZIN', 'TIDAK_HADIR', 'DEFAULT');
ALTER TABLE "AbsensiMahasiswa" ALTER COLUMN "status_absensi_mahasiswa" DROP DEFAULT;
ALTER TABLE "AbsensiMahasiswa" ALTER COLUMN "status_absensi_mahasiswa" TYPE "StatusAbsensiMahasiswa_new" USING ("status_absensi_mahasiswa"::text::"StatusAbsensiMahasiswa_new");
ALTER TYPE "StatusAbsensiMahasiswa" RENAME TO "StatusAbsensiMahasiswa_old";
ALTER TYPE "StatusAbsensiMahasiswa_new" RENAME TO "StatusAbsensiMahasiswa";
DROP TYPE "StatusAbsensiMahasiswa_old";
ALTER TABLE "AbsensiMahasiswa" ALTER COLUMN "status_absensi_mahasiswa" SET DEFAULT 'DEFAULT';
COMMIT;

-- AlterTable
ALTER TABLE "Absensi" DROP COLUMN "batas_jam_masuk",
ADD COLUMN     "jangka_waktu_absensi" INTEGER,
ALTER COLUMN "status_absensi" SET DEFAULT 'BELUM_BUKA';
