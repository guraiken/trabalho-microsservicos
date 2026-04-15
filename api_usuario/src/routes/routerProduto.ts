import express from 'express'
import { ServiceProduto } from '../services/serviceProduto'
import { log } from 'console'

const serviceProduto = new ServiceProduto()
export const routerProduto = express.Router()

routerProduto.get('/', async (req, res) => {
    try {
        const produtos = await serviceProduto.getAll()
       
        return res.json(produtos)
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar produtos' })
    }
})

routerProduto.get('/:id', async (req, res) => {
    const id = Number(req.params.id)

    try {
        const produto = await serviceProduto.getById(id)

        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' })
        }

        return res.json(produto)
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar produto' })
    }
})

routerProduto.post('/', async (req, res) => {
    const { nome, descricao, quantidade, valor } = req.body

    try {
        const produto = await serviceProduto.addProduto({ nome, descricao, quantidade, valor })
        return res.status(201).json(produto)
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao adicionar produto' })
    }
})

routerProduto.post('/:id/compra', async (req, res) => {
    const id = Number(req.params.id)
    const { quantidade } = req.body

    try {
        const produtoAtualizado = await serviceProduto.compra(id, Number(quantidade))
        return res.json(produtoAtualizado)
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Erro ao processar compra'
        const status = message === 'Produto não encontrado' ? 404 : 400
        return res.status(status).json({ error: message })
    }
})

routerProduto.delete('/:id', async (req, res) => {
    const id = Number(req.params.id)

    try {
        const produto = await serviceProduto.deleteProduto(id)
        return res.json(produto)
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao deletar produto' })
    }
})

