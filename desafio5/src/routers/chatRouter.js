//PROBAR OTRA FORMA
import express, { Router } from "express"
import { Message } from "../entidades/Messsage.js"
import { menMan } from "../dao/mongo/managers/messages.manager.js"
import { handleMessageSocket } from "../middleware/socket.js"

export const chatRouter = Router()

chatRouter.use(express.json())
chatRouter.use(express.urlencoded({ extended: true }))

chatRouter.post("/", async (req, res, next) => {
    const mensaje = new Message(req.body)
    const message = await menMan.guardar(mensaje.datos())
    await handleMessageSocket()

    res.json(message)
})