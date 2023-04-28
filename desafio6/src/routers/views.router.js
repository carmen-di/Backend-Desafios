import express, { Router } from 'express';
import mongoose from "mongoose"

export const viewsRouter = Router()

viewsRouter.use(express.json())
viewsRouter.use(express.urlencoded({ extended: true }))

viewsRouter.get('/products', async (req, res) => {
    res.render('products', {title: "Productos"})
})

viewsRouter.get('/carts/:cid', async (req, res) => {
    res.render('cart', {title: "Carrito"})
})

viewsRouter.get("/", async (req, res) => {
    res.redirect("/login")
})

viewsRouter.get("/login", async (req, res) => {
    res.render("login", {title: "Login"})
})

viewsRouter.get("/register", async (req, res) => {
    res.render("register", {title: "Register"})
})

viewsRouter.get('/chat', async (req, res) => {
    try {
        const mensajesDb = mongoose.connection.db.collection('messages')
        const mensajes = await mensajesDb.find().toArray()
        res.render('chat', {
            mensajes: mensajes,
            hayMensajes: mensajes.length > 0,
            title: 'Chat'
        })
    } catch (error) {
        next(error)
    }
})