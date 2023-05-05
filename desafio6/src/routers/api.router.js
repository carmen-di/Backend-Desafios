import express, { Router } from 'express';
import { productRouter } from "./product.router.js"
import { cartRouter } from "./cart.router.js"
import { chatRouter } from "./chat.router.js"
import { deleteSesiones, postSesiones } from "../controllers/session.controller.js"
import { postUsuarios } from "../controllers/users.controller.js"

export const apiRouter = Router()

apiRouter.use(express.json())
apiRouter.use(express.urlencoded({ extended: true }))

apiRouter.use("/products", productRouter)
apiRouter.use("/carts", cartRouter)
apiRouter.use("/messages", chatRouter)

apiRouter.post("/users", postUsuarios)
apiRouter.post("/sessions", postSesiones)
apiRouter.delete("/sessions", deleteSesiones)

apiRouter.use((error, req, res, next) => {
    switch (error.message) {
        case 'id no encontrado':
            res.status(404)
            break
        case 'falta un argumento':
            res.status(400)
            break
        default:
            res.status(500)
    }
    res.json({ message: error.message })
})