-- CreateEnum
CREATE TYPE "NamaRole" AS ENUM ('ADMIN', 'MAHASISWA', 'DOSEN');

-- CreateEnum
CREATE TYPE "namaStatusMahasiswa" AS ENUM ('HADIR', 'HADIR_DILUAR_BATAS_WAKTU', 'IZIN', 'ALPHA');

-- CreateEnum
CREATE TYPE "namaStatusAbsensi" AS ENUM ('BUKA', 'TUTUP');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nim_nip" BIGINT NOT NULL,
    "password" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "nama_role" "NamaRole" NOT NULL DEFAULT 'MAHASISWA',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mahasiswa" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "nim" BIGINT NOT NULL,
    "ttl" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "alamat" TEXT,
    "no_hp" TEXT,
    "imei" BIGINT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Mahasiswa_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "Dosen" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "nip" BIGINT NOT NULL,
    "ttl" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "alamat" TEXT,
    "no_hp" TEXT,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Dosen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "nama_admin" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "MataKuliah" (
    "id" TEXT NOT NULL,
    "kode_matakuliah" TEXT NOT NULL,
    "nama_matakuliah" TEXT NOT NULL,
    "sks" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "MataKuliah_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "SemesterMataKuliah" (
    "semester_id" TEXT NOT NULL,
    "matakuliah_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "SemesterMataKuliah_pkey" PRIMARY KEY ("semester_id","matakuliah_id")
);

-- CreateTable
CREATE TABLE "DosenMatakuliah" (
    "dosen_id" TEXT NOT NULL,
    "matakuliah_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "DosenMatakuliah_pkey" PRIMARY KEY ("dosen_id","matakuliah_id")
);

-- CreateTable
CREATE TABLE "RuanganMataKuliah" (
    "ruangan_id" TEXT NOT NULL,
    "matakuliah_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "RuanganMataKuliah_pkey" PRIMARY KEY ("ruangan_id","matakuliah_id")
);

-- CreateTable
CREATE TABLE "Absensi" (
    "id" TEXT NOT NULL,
    "matakuliah_id" TEXT NOT NULL,
    "dosen_id" TEXT NOT NULL,
    "jam_masuk" TIMESTAMPTZ NOT NULL,
    "batas_absensi" TIMESTAMPTZ NOT NULL,
    "qr_code" TEXT NOT NULL,
    "status_absensi_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Absensi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AbsensiDaftarMahasiswa" (
    "id" TEXT NOT NULL,
    "absensi_id" TEXT NOT NULL,
    "mahasiswa_id" TEXT NOT NULL,
    "status_mahasiswa_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "AbsensiDaftarMahasiswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusMahasiswa" (
    "id" TEXT NOT NULL,
    "status" "namaStatusMahasiswa" NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "StatusMahasiswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusAbsensi" (
    "id" TEXT NOT NULL,
    "status" "namaStatusAbsensi" NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "StatusAbsensi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_nim_nip_key" ON "User"("nim_nip");

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_imei_key" ON "Mahasiswa"("imei");

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_user_id_key" ON "Mahasiswa"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Dosen_nip_key" ON "Dosen"("nip");

-- CreateIndex
CREATE UNIQUE INDEX "Dosen_email_key" ON "Dosen"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Dosen_user_id_key" ON "Dosen"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_user_id_key" ON "Admin"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "MataKuliah_kode_matakuliah_key" ON "MataKuliah"("kode_matakuliah");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dosen" ADD CONSTRAINT "Dosen_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SemesterMataKuliah" ADD CONSTRAINT "SemesterMataKuliah_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SemesterMataKuliah" ADD CONSTRAINT "SemesterMataKuliah_matakuliah_id_fkey" FOREIGN KEY ("matakuliah_id") REFERENCES "MataKuliah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DosenMatakuliah" ADD CONSTRAINT "DosenMatakuliah_dosen_id_fkey" FOREIGN KEY ("dosen_id") REFERENCES "Dosen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DosenMatakuliah" ADD CONSTRAINT "DosenMatakuliah_matakuliah_id_fkey" FOREIGN KEY ("matakuliah_id") REFERENCES "MataKuliah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuanganMataKuliah" ADD CONSTRAINT "RuanganMataKuliah_ruangan_id_fkey" FOREIGN KEY ("ruangan_id") REFERENCES "Ruangan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuanganMataKuliah" ADD CONSTRAINT "RuanganMataKuliah_matakuliah_id_fkey" FOREIGN KEY ("matakuliah_id") REFERENCES "MataKuliah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_matakuliah_id_fkey" FOREIGN KEY ("matakuliah_id") REFERENCES "MataKuliah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_dosen_id_fkey" FOREIGN KEY ("dosen_id") REFERENCES "Dosen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_status_absensi_id_fkey" FOREIGN KEY ("status_absensi_id") REFERENCES "StatusAbsensi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AbsensiDaftarMahasiswa" ADD CONSTRAINT "AbsensiDaftarMahasiswa_absensi_id_fkey" FOREIGN KEY ("absensi_id") REFERENCES "Absensi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AbsensiDaftarMahasiswa" ADD CONSTRAINT "AbsensiDaftarMahasiswa_mahasiswa_id_fkey" FOREIGN KEY ("mahasiswa_id") REFERENCES "Mahasiswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AbsensiDaftarMahasiswa" ADD CONSTRAINT "AbsensiDaftarMahasiswa_status_mahasiswa_id_fkey" FOREIGN KEY ("status_mahasiswa_id") REFERENCES "StatusMahasiswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
