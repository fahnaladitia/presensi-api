-- DropForeignKey
ALTER TABLE "Mahasiswa" DROP CONSTRAINT "Mahasiswa_jurusan_id_fkey";

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_jurusan_id_fkey" FOREIGN KEY ("jurusan_id") REFERENCES "Jurusan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
