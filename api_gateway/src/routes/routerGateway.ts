import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

const produtoBaseUrl = 'http://localhost:3001'
const pedidoBaseUrl = 'http://localhost:3002'

export const routerGateway = express.Router()

routerGateway.use('/produtos', createProxyMiddleware({
    target: produtoBaseUrl,
    changeOrigin: true,
    pathRewrite: {
        '^/produtos': '/produtos',
    },
}))

routerGateway.use('/pedidos', createProxyMiddleware({
    target: pedidoBaseUrl,
    changeOrigin: true,
    pathRewrite: {
        '^/pedidos': '/pedidos',
    },
}))
