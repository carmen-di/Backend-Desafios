//PROBAR OTRA FORMA
import express, { Router } from 'express'
import { menMan } from '../dao/mongo/managers/messages.manager.js'
import { handleMessageSocket } from '../middleware/socket.js'

export const chatRouter = Router()

chatRouter.use(express.json())

chatRouter
  .route('/')
  .post(async (req, res, next) => {
    const response = await menMan.save(req.body)
    await handleMessageSocket()
    res.json({ rta: 'OK, informacion enviada', response })
  })