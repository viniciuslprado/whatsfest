/*
  Warnings:

  - You are about to drop the column `atualizadoEm` on the `Festa` table. All the data in the column will be lost.
  - You are about to drop the column `urlImagemFlyer` on the `Festa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Festa" DROP COLUMN "atualizadoEm",
DROP COLUMN "urlImagemFlyer";
