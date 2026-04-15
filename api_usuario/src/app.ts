import express from 'express'
import cors from "cors"
import { routerProduto } from "./routes/routerProduto"

export const app = express()

app.use(express.json())
app.use(cors())

app.use('/', routerProduto)


