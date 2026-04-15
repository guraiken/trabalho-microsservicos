import type { Pedido } from '../prisma/generated/prisma/client'
import { prisma } from '../prisma/prisma'

export class ServicePedido {
    async getAll(): Promise<Pedido[]> {
        return prisma.pedido.findMany()
    }

    async getById(id: number): Promise<Pedido | null> {
        return prisma.pedido.findUnique({
            where: { id },
        })
    }

    async makePedido(data: { produtoId: number; quantidade: number }): Promise<Pedido> {
        const produtoResponse = await fetch(`http://localhost:3000/produtos/${data.produtoId}`)

        if (!produtoResponse.ok) {
            console.log(produtoResponse)
            throw new Error('Produto não encontrado na API de produtos')
        }

        const produto = await produtoResponse.json()

        if (!produto || produto.id === undefined) {
            throw new Error('Produto inválido retornado pela API de produtos')
        }

        if (data.quantidade <= 0) {
            throw new Error('Quantidade deve ser maior que zero')
        }

        const compraResponse = await fetch(`http://localhost:3000/produtos/${data.produtoId}/compra`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantidade: data.quantidade }),
        })

        if (!compraResponse.ok) {
            console.log(compraResponse);
            
            const errorBody = await compraResponse.json().catch(() => null)
            const message = errorBody?.error || 'Falha ao processar compra na API de produtos'
            throw new Error(message)
        }

        const produtoAtualizado = await compraResponse.json()

        return prisma.pedido.create({
            data: {
                produto: produtoAtualizado.nome,
                preco: Number(produtoAtualizado.valor),
                quantidade: data.quantidade,
                produtoId: data.produtoId
            },
        })
    }
}
