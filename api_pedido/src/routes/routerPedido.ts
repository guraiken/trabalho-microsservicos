import express from 'express'
import { ServicePedido } from '../services/servicePedido'

const servicePedido = new ServicePedido()
export const routerPedido = express.Router()

routerPedido.get('/', async (req, res) => {
    try {
        const pedidos = await servicePedido.getAll()
        return res.json(pedidos)
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar pedidos' })
    }
})

routerPedido.get('/:id', async (req, res) => {
    const id = Number(req.params.id)

    try {
        const pedido = await servicePedido.getById(id)

        if (!pedido) {
            return res.status(404).json({ error: 'Pedido não encontrado' })
        }

        return res.json(pedido)
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar pedido' })
    }
})

routerPedido.post('/', async (req, res) => {
    const { produtoId, quantidade } = req.body

    try {
        const pedido = await servicePedido.makePedido({ produtoId, quantidade })
        return res.status(201).json(pedido)
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Erro ao criar pedido'
        return res.status(400).json({ error: message })
    }
})
