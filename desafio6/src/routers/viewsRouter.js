import express, { Router } from 'express';
import mongoose from "mongoose"

export const viewsRouter = Router()

viewsRouter.use(express.json())
viewsRouter.use(express.urlencoded({ extended: true }))

viewsRouter.get('/', async (req, res) => {
    const productosDb = mongoose.connection.db.collection('products')
    const productos = await productosDb.find().toArray()
    res.render('index', {
        productos: productos,
        title: 'Productos'
    })
})

viewsRouter.get('/products', async (req, res) => {
    res.render('products')
})

viewsRouter.get('/carts/:cid', async (req, res) => {
    res.render('cart')
})

viewsRouter.get('/realtimeproducts', async (req, res) => {
    try {
        const productosDb = mongoose.connection.db.collection('products')
        const list = await productosDb.find().toArray()
        
        res.render("realtimeproducts", {
            title: "Real Time Products",
            list: list,
            showList: list.length > 0
        })
    } catch (error) {
        return next(error)
    }
})

viewsRouter.get('/chat', async (req, res) => {
    const mensajesDb = mongoose.connection.db.collection('messages')
    const mensajes = await mensajesDb.find().toArray()
    res.render('chat', {
        mensajes: mensajes,
        hayMensajes: mensajes.length > 0,
        title: 'Chat'
    })
})