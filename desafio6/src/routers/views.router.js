import express, { Router } from 'express';
import mongoose from "mongoose"
import { requireAuth } from "../middleware/auth.js"

export const viewsRouter = Router()

viewsRouter.use(express.json())
viewsRouter.use(express.urlencoded({ extended: true }))

viewsRouter.get("/", async (req, res) => {
    res.redirect("/login")
})

viewsRouter.get("/login", async (req, res) => {
    res.render("login", {title: "Login"})
})

viewsRouter.get("/register", async (req, res) => {
    res.render("register", {title: "Registro"})
})

viewsRouter.get('/products', requireAuth, async (req, res) => {
    const dataSession = req.session["user"]
    res.render('products', {title: "Productos", user: dataSession.name, rol: dataSession.rol})
})

viewsRouter.get('/carts/:cid', requireAuth, async (req, res) => {
    res.render('cart', {title: "Carrito"})
})

viewsRouter.get('/chat', requireAuth, async (req, res) => {
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