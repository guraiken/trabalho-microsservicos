import { log } from "node:console";
import { app } from "./app";

const PORT = 3002

app.listen(PORT,()=>{
    log(`Servidor de pedidos rodando na porta ${PORT}`)
})