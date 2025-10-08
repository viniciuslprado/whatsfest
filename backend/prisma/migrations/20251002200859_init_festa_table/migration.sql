-- CreateTable
CREATE TABLE "Festa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "dataHora" TIMESTAMP(3) NOT NULL,
    "cidade" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "urlImagemFlyer" TEXT NOT NULL,
    "descricaoCurta" TEXT NOT NULL,
    "linkVendas" TEXT,
    "destaque" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Festa_pkey" PRIMARY KEY ("id")
);
