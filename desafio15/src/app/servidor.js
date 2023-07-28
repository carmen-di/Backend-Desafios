import express from 'express'
import { PORT } from '../config/servidor.config.js'
import { engine } from 'express-handlebars'
import { apiRouter } from '../routers/api.router.js'
import { chatRouter } from '../routers/chat.router.js'
import { viewsRouter } from '../routers/views.router.js'
import { conectar } from '../database/mongoose.js'
import { Server } from 'socket.io'
import session from 'express-session'
import MongoStore from "connect-mongo"
import { handleMessageSocket, socketHandle } from '../middleware/socket.js'
import { MONGODB_CNX_STR} from '../config/database.config.js'
import { passportInitialize, passportSession } from '../middleware/passport.js'
import { addLogger } from '../utils/logger.js'
import { loggerRouter } from '../routers/logger.router.js'
import { recoverRouter } from '../routers/recover.router.js'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'

await conectar()

const app = express()

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentacion de las API",
            description: "APIs desarrolladas en el proyecto del curso de programacion backend",
        },
    },
    apis: [`./src/docs/**/*.yaml`],
};

const specs = swaggerJsdoc(swaggerOptions);
app.use("/api/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

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

app.use(passportInitialize, passportSession)

app.use(addLogger)

app.use('/api', apiRouter)
app.use('/chat', chatRouter)
app.use('/loggerTest', loggerRouter)
app.use("/recover", recoverRouter)
app.use('/', viewsRouter)

export const io = new Server(server)

io.on("connection", async clientSocket => {
    console.log("nuevo cliente conectado")
    await socketHandle()
    await handleMessageSocket()
})