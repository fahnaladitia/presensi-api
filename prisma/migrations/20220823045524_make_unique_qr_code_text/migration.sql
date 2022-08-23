/*
  Warnings:

  - A unique constraint covering the columns `[qr_code_text]` on the table `QrCodeWindow` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "QrCodeWindow_qr_code_text_key" ON "QrCodeWindow"("qr_code_text");
