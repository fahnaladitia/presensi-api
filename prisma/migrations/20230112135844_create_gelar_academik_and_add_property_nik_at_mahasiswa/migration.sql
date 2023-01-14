-- AlterTable
ALTER TABLE "Mahasiswa" ADD COLUMN     "gelar_academik_id" TEXT,
ADD COLUMN     "nik" TEXT;

-- CreateTable
CREATE TABLE "GelarAkademik" (
    "id" TEXT NOT NULL,
    "nama_gelar" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "GelarAkademik_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_gelar_academik_id_fkey" FOREIGN KEY ("gelar_academik_id") REFERENCES "GelarAkademik"("id") ON DELETE SET NULL ON UPDATE CASCADE;
