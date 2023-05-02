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
import MongoStore from "connect-mongo"
import { handleMessageSocket, socketHandle } from '../middleware/socket.js'
import { MONGODB_CNX_STR} from '../config/database.config.js'
import { usersModel } from '../dao/mongo/models/user.schema.js'
import { requireAuth } from '../middleware/auth.js'

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
    resave: false,
    saveUninitialized: false
}))

const server = app.listen(PORT, () => {
    console.log(`servidor escuchando en puerto ${PORT}`)
})

app.use('/api', apiRouter)
app.use('/chat', chatRouter)
app.use('/', viewsRouter)
app.use(error)

app.get("/profile", requireAuth, (req, res) => {
    res.render("profile", {title: "Profile", user: JSON.stringify(req.session["user"])})
})

app.post("/api/usuarios", async (req, res) => {
    console.log(req.body)
    const usuarioCreado = await usersModel.create(req.body)
    req.session.user = {
        name: usuarioCreado.name,
        email: usuarioCreado.email
    }
    res.send(usuarioCreado)
})

app.post("/api/sesiones", async (req, res) => {
    console.log(req.body)
    const usuarioEncontrado = await usersModel.findOne({ email: req.body.email }).lean()
    if (!usuarioEncontrado) return res.sendStatus(401)

    if (usuarioEncontrado.password !== req.body.password) {
        return res.sendStatus(401)
    }

    req.session.user = {
        name: usuarioEncontrado.name,
        email: usuarioEncontrado.email,
        age: usuarioEncontrado.age,
    }

    res.status(201).json(req.session.user)
})

export const io = new Server(server)

io.on("connection", async clientSocket => {
    console.log("nuevo cliente conectado")
    await socketHandle()
    await handleMessageSocket()
})
