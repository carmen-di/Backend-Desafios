import express, { Router } from 'express';
import { productRouter } from "./product.router.js"
import { cartRouter } from "./cart.router.js"
import { chatRouter } from "./chat.router.js"
import { sessionRouter } from './session.router.js';

export const apiRouter = Router()

apiRouter.use(express.json())
apiRouter.use(express.urlencoded({ extended: true }))

apiRouter.use("/products", productRouter)
apiRouter.use("/carts", cartRouter)
apiRouter.use("/chat", chatRouter)
apiRouter.use("/", sessionRouter)