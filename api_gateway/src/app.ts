import express from 'express'
import cors from 'cors'
import { routerGateway } from './routes/routerGateway'

export const app = express()

app.use(express.json())
app.use(cors())
app.use('/', routerGateway)
