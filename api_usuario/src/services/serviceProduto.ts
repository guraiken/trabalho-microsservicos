import type { Produto } from '../prisma/generated/prisma/client'
import { prisma } from '../prisma/prisma'


export class ServiceProduto {
    async getAll(): Promise<Produto[]> {
        return prisma.produto.findMany()
    }

    async getById(id: number): Promise<Produto | null> {
        return prisma.produto.findUnique({
            where: { id },
        })
    }

    async addProduto(data: {
        nome: string
        descricao: string
        quantidade: number
        valor: number | string
    }): Promise<Produto> {
        return prisma.produto.create({
            data,
        })
    }

    async compra(id: number, quantidade: number): Promise<Produto> {
        const produto = await prisma.produto.findUnique({
            where: { id },
        })

        if (!produto) {
            throw new Error("Produto não encontrado")
        }

        if (quantidade <= 0) {
            throw new Error("Quantidade de compra deve ser maior que zero")
        }

        if (produto.quantidade < quantidade) {
            throw new Error("Quantidade insuficiente em estoque")
        }

        return prisma.produto.update({
            where: { id },
            data: {
                quantidade: produto.quantidade - quantidade,
            },
        })
    }

    async deleteProduto(id: number): Promise<Produto> {
        return prisma.produto.delete({
            where: { id },
        })
    }
}
