-- CreateEnum
CREATE TYPE "StatusAbsensi" AS ENUM ('DEFAULT', 'BUKA', 'TUTUP');

-- CreateEnum
CREATE TYPE "StatusAbsensiMahasiswa" AS ENUM ('HADIR', 'IZIN', 'ALPA', 'TELAT', 'DEFAULT');

-- CreateTable
CREATE TABLE "Mahasiswa" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nim" BIGINT NOT NULL,
    "nama" TEXT NOT NULL,
    "ttl" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "password" TEXT NOT NULL DEFAULT 'password',
    "alamat" TEXT,
    "no_hp" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "angkatan_id" TEXT NOT NULL,
    "jurusan_id" TEXT NOT NULL,
    "imei" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Mahasiswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Angkatan" (
    "id" TEXT NOT NULL,
    "angkatan" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Angkatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT 'password',
    "alamat" TEXT,
    "no_hp" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dosen" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT 'password',
    "alamat" TEXT,
    "ttl" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "no_hp" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Dosen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jurusan" (
    "id" TEXT NOT NULL,
    "nama_jurusan" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Jurusan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ruangan" (
    "id" TEXT NOT NULL,
    "nama_ruangan" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Ruangan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kelas" (
    "id" TEXT NOT NULL,
    "nama_kelas" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Kelas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Semester" (
    "id" TEXT NOT NULL,
    "semester" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Semester_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JadwalMataKuliah" (
    "id" TEXT NOT NULL,
    "jadwal" TIMESTAMPTZ NOT NULL,
    "matakuliah_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "JadwalMataKuliah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Absensi" (
    "id" TEXT NOT NULL,
    "jam_masuk" TIMESTAMPTZ,
    "batas_jam_masuk" TIMESTAMPTZ,
    "jadwal_matakuliah_id" TEXT NOT NULL,
    "status_absensi" "StatusAbsensi" NOT NULL DEFAULT 'DEFAULT',
    "pertemuan_ke" INTEGER NOT NULL,
    "qr_code" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Absensi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AbsensiMahasiswa" (
    "id" TEXT NOT NULL,
    "absensi_id" TEXT NOT NULL,
    "qr_code" TEXT NOT NULL,
    "mahasiswa_id" TEXT NOT NULL,
    "status_absensi_mahasiswa" "StatusAbsensiMahasiswa" NOT NULL DEFAULT 'DEFAULT',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "AbsensiMahasiswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MataKuliah" (
    "id" TEXT NOT NULL,
    "kode_matakuliah" TEXT NOT NULL,
    "nama_matakuliah" TEXT NOT NULL,
    "sks" INTEGER NOT NULL,
    "dosen_id" TEXT,
    "kelas_id" TEXT NOT NULL,
    "semester_id" TEXT NOT NULL,
    "jurusan_id" TEXT NOT NULL,
    "ruangan_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "MataKuliah_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_email_key" ON "Mahasiswa"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_nim_key" ON "Mahasiswa"("nim");

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_imei_key" ON "Mahasiswa"("imei");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Dosen_email_key" ON "Dosen"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Absensi_qr_code_key" ON "Absensi"("qr_code");

-- CreateIndex
CREATE UNIQUE INDEX "Absensi_id_qr_code_key" ON "Absensi"("id", "qr_code");

-- CreateIndex
CREATE UNIQUE INDEX "AbsensiMahasiswa_absensi_id_key" ON "AbsensiMahasiswa"("absensi_id");

-- CreateIndex
CREATE UNIQUE INDEX "AbsensiMahasiswa_qr_code_key" ON "AbsensiMahasiswa"("qr_code");

-- CreateIndex
CREATE UNIQUE INDEX "MataKuliah_kode_matakuliah_key" ON "MataKuliah"("kode_matakuliah");

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_angkatan_id_fkey" FOREIGN KEY ("angkatan_id") REFERENCES "Angkatan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_jurusan_id_fkey" FOREIGN KEY ("jurusan_id") REFERENCES "Jurusan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JadwalMataKuliah" ADD CONSTRAINT "JadwalMataKuliah_matakuliah_id_fkey" FOREIGN KEY ("matakuliah_id") REFERENCES "MataKuliah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_jadwal_matakuliah_id_fkey" FOREIGN KEY ("jadwal_matakuliah_id") REFERENCES "JadwalMataKuliah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AbsensiMahasiswa" ADD CONSTRAINT "AbsensiMahasiswa_absensi_id_qr_code_fkey" FOREIGN KEY ("absensi_id", "qr_code") REFERENCES "Absensi"("id", "qr_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AbsensiMahasiswa" ADD CONSTRAINT "AbsensiMahasiswa_mahasiswa_id_fkey" FOREIGN KEY ("mahasiswa_id") REFERENCES "Mahasiswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MataKuliah" ADD CONSTRAINT "MataKuliah_dosen_id_fkey" FOREIGN KEY ("dosen_id") REFERENCES "Dosen"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MataKuliah" ADD CONSTRAINT "MataKuliah_kelas_id_fkey" FOREIGN KEY ("kelas_id") REFERENCES "Kelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MataKuliah" ADD CONSTRAINT "MataKuliah_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MataKuliah" ADD CONSTRAINT "MataKuliah_jurusan_id_fkey" FOREIGN KEY ("jurusan_id") REFERENCES "Jurusan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MataKuliah" ADD CONSTRAINT "MataKuliah_ruangan_id_fkey" FOREIGN KEY ("ruangan_id") REFERENCES "Ruangan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
