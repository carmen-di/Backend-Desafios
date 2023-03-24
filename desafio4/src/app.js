import express from 'express'
import { engine } from 'express-handlebars'
import { Server as SocketIOServer } from 'socket.io'
import {ProductManager} from './ProductManager.js'
import { apiRouter } from "./routes/apiRouter.js"

const productsManager = new ProductManager('./database/products.json')

const app = express()

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(express.static('./public'))

app.use("/api", apiRouter);

const httpServer = app.listen(8080)

const io = new SocketIOServer(httpServer)

io.on('connection', async clientSocket => {
    console.log('Cliente conectado')
    clientSocket.on('nuevoProducto', async producto => {
        await productsManager.save(producto)
        const data = await productsManager.getProducts()
        const productos = data.map(m => ({ ...m }))
        io.sockets.emit('actualizarProductos', productos)
    })

    const data = await productsManager.getProducts()
    const productos = data.map(m => ({ ...m }))
    io.sockets.emit('actualizarProductos', productos)
})

app.get('/', async (req, res) => {
    const productos = await productsManager.getProducts()
    res.render('index', {
        productos: productos.length > 0,
        title: 'Productos'
    })
})

app.get('/realtimeproducts', async (req, res) => {
    res.render('realtimeproducts')
})

