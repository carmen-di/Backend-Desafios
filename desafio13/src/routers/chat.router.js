import express, { Router } from 'express'
import { handlePost } from "../controllers/chat.controller.js"
import { isUser } from "../middleware/auth.js"

export const chatRouter = Router()

chatRouter.post("/", isUser, handlePost)