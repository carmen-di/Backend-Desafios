import express from "express"
import { apiRouter } from "./routers/apiRouter.js"

const app = express()

app.use("/api", apiRouter);

const PORT = 8080
const server = app.listen(PORT, () => { console.log(`escuchando en ${PORT}`) })