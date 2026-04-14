import { log } from "node:console";
import { app } from "./app";

const PORT = 3001

app.listen(PORT,()=>{
    log(`Servidor de usuario rodando na porta ${PORT}`)
})