import { Router } from "express"
import { postSesiones, deleteSesiones, getCurrentSessionController } from '../controllers/session.controller.js'
import { postUsuarios } from '../controllers/users.controller.js'
import { autenticacionPorGithub, antenticacionPorGithub_CB, autenticacionUserPass } from '../middleware/passport.js';
import { alreadyHasSession } from '../middleware/auth.js';

export const sessionRouter = Router()

sessionRouter.post("/users", alreadyHasSession, postUsuarios)
sessionRouter.post("/sessions", autenticacionUserPass, postSesiones)

sessionRouter.get("/current", (req, res, next) =>{

})

sessionRouter.post("/logout", deleteSesiones)

sessionRouter.get("/sessions/github", autenticacionPorGithub)
sessionRouter.get("/sessions/githubcallback", antenticacionPorGithub_CB, (req, res, next) => { res.redirect('/') })