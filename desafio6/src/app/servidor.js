import express from 'express'
import { PORT } from '../config/servidor.config.js'
import { engine } from 'express-handlebars'
import { apiRouter } from '../routers/api.router.js'
import { chatRouter } from '../routers/chat.router.js'
import { viewsRouter } from '../routers/views.router.js'
import { conectar } from '../database/mongoose.js'
import { error } from '../middleware/errors.js'
import { Server } from 'socket.io'
import session from 'express-session'
import FileStore from "session-file-store"
import { loginRouter } from '../routers/login.router.js'
import { registerRouter } from '../routers/sign.router.js'
import { profileRouter } from '../routers/profile.router.js'
import MongoStore from "connect-mongo"
import { handleMessageSocket, socketHandle } from '../middleware/socket.js'
import { MONGODB_CNX_STR} from '../config/database.config.js'

await conectar()

const app = express()
const filestorage = FileStore(session)

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')


app.use(express.static('./public'))
app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGODB_CNX_STR,
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 10000
    }),
    secret: 'palabra-secreta',
    resave: true,
    saveUninitialized: true
}))

const server = app.listen(PORT, () => {
    console.log(`servidor escuchando en puerto ${PORT}`)
})

app.use('/api', apiRouter)
app.use('/chat', chatRouter)
app.use("/login", loginRouter)
app.use("/register", registerRouter)
app.use("/profile", profileRouter)
app.use('/', viewsRouter)
app.use(error)

export const io = new Server(server)

io.on("connection", async clientSocket => {
    console.log("nuevo cliente conectado")
    await socketHandle()
    await handleMessageSocket()
})
