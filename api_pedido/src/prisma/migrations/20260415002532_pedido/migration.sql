-- CreateTable
CREATE TABLE "Pedido" (
    "id" SERIAL NOT NULL,
    "produto" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);
