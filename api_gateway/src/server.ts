import { log } from 'node:console'
import { app } from './app'

const PORT = 3000

app.listen(PORT, () => {
    log(`API Gateway rodando na porta ${PORT}`)
})
