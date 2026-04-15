import express from 'express'
import cors from "cors"
import { routerPedido } from "./routes/routerPedido"

export const app = express()

app.use(express.json())
app.use(cors())

app.use('/pedidos', routerPedido)


