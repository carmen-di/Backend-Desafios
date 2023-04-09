import { io } from '../app.js'
import { prod } from "../dao/mongo/managers/productos.manager.js"
import { menMan } from "../dao/mongo/managers/messages.manager.js"

export async function socketHandle(req, res, next) {
  const products = await prod.getProducts()
  io.emit('updateList', {
    list: products,
    showList: products.length > 0
  })
}

export async function handleMessageSocket(req, res, next) {
  const messages = await menMan.getMessages()
  io.emit('messagesList', {
    list: messages,
    showList: messages.length > 0
  })
}