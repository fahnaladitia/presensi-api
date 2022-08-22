/*
  Warnings:

  - The required column `qr_code_text` was added to the `QrCodeWindow` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "QrCodeWindow" ADD COLUMN     "qr_code_text" TEXT NOT NULL;
