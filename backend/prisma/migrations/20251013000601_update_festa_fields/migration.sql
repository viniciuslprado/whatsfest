/*
  Warnings:

  - You are about to drop the column `dataHora` on the `Festa` table. All the data in the column will be lost.
  - Added the required column `atualizadoEm` to the `Festa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Festa" DROP COLUMN "dataHora",
ADD COLUMN     "atualizadoEm" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "data" TIMESTAMP(3),
ADD COLUMN     "horaFim" TEXT,
ADD COLUMN     "horaInicio" TEXT,
ALTER COLUMN "local" DROP NOT NULL,
ALTER COLUMN "urlImagemFlyer" DROP NOT NULL,
ALTER COLUMN "descricaoCurta" DROP NOT NULL;
