import express from 'express'
import { PORT } from '../config/servidor.config.js'
import { engine } from 'express-handlebars'
import { apiRouter } from '../routers/api.router.js'
import { chatRouter } from '../routers/chatRouter.js'
import { viewsRouter } from '../routers/views.router.js'
import { conectar } from '../database/mongoose.js'
import { error } from '../middleware/errors.js'
import { Server } from 'socket.io'
import { handleMessageSocket, socketHandle } from '../middleware/socket.js'

await conectar()

const app = express()

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')


app.use(express.static('./public'))

const server = app.listen(PORT, () => {
    console.log(`servidor escuchando en puerto ${PORT}`)
})

app.use('/api', apiRouter)
app.use('/chat', chatRouter)
app.use('/', viewsRouter)
app.use(error)

export const io = new Server(server)

io.on("connection", async clientSocket => {
    console.log("nuevo cliente conectado")
    await socketHandle()
    await handleMessageSocket()
})
