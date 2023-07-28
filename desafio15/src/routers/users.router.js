import { Router } from "express"
import { changeRole } from "../controllers/users.controller.js"

export const usersRouter = Router()

usersRouter.post("/premium/:uid", changeRole)