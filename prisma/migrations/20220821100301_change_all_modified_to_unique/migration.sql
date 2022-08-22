/*
  Warnings:

  - A unique constraint covering the columns `[nama_jurusan]` on the table `Jurusan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nama_kelas]` on the table `Kelas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nama_ruangan]` on the table `Ruangan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[semester]` on the table `Semester` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Jurusan_nama_jurusan_key" ON "Jurusan"("nama_jurusan");

-- CreateIndex
CREATE UNIQUE INDEX "Kelas_nama_kelas_key" ON "Kelas"("nama_kelas");

-- CreateIndex
CREATE UNIQUE INDEX "Ruangan_nama_ruangan_key" ON "Ruangan"("nama_ruangan");

-- CreateIndex
CREATE UNIQUE INDEX "Semester_semester_key" ON "Semester"("semester");
