import { Message } from '../models/Messsage.js'
import { io } from '../app/servidor.js'
import { messagesRepository } from '../repositories/messages.repository.js'

export async function handlePost(req, res, next) {
    try {
        const mensaje = new Message(req.body)
        const message = await messagesRepository.create(mensaje.datos())
        const messages = await messagesRepository.obtenerTodos()
        io.emit("actualizarMensajes", {
            mensajes: messages,
            hayMensajes: messages.length > 0
        })
        res.json(message)
    } catch (error) {
        next(error)
    }
}
