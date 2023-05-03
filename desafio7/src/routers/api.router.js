import express, { Router } from 'express';
import { productRouter } from "./product.router.js"
import { cartRouter } from "./cart.router.js"
import { chatRouter } from "./chat.router.js"
import { postSesiones, deleteSesiones, getCurrentSessionController } from '../controllers/session.controller.js'
import { postUsuarios } from '../controllers/users.controller.js'
import { autenticacionPorGithub, antenticacionPorGithub_CB, autenticacionUserPass } from '../middleware/passport.js';
import { soloLogueadosApi } from '../middleware/auth.js';

export const apiRouter = Router()

apiRouter.use(express.json())
apiRouter.use(express.urlencoded({ extended: true }))

apiRouter.use("/products", productRouter)
apiRouter.use("/carts", cartRouter)
apiRouter.use("/chat", chatRouter)

apiRouter.get("/sessions/github", autenticacionPorGithub)
apiRouter.get("/sessions/githubcallback", antenticacionPorGithub_CB, (req, res, next) => { res.redirect('/') })

apiRouter.post("/users", postUsuarios)
apiRouter.post("/sessions", autenticacionUserPass, postSesiones)

apiRouter.get("/current", soloLogueadosApi, getCurrentSessionController)

apiRouter.post("/logout", deleteSesiones)

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