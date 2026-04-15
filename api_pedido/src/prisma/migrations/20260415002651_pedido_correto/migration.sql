/*
  Warnings:

  - You are about to drop the `Pedido` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Pedido";

-- CreateTable
CREATE TABLE "pedido" (
    "id" SERIAL NOT NULL,
    "produto" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "pedido_pkey" PRIMARY KEY ("id")
);
