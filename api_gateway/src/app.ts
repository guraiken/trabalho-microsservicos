import express from 'express'
import cors from 'cors'
import { routerGateway } from './routes/routerGateway'

export const app = express()

app.use('/', routerGateway)
app.use(cors())
