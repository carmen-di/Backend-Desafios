import { Router } from 'express';
import { prod } from '../dao/mongo/managers/products.manager.js'
import { menMan } from '../dao/mongo/managers/messages.manager.js'
//import mongoose from "mongoose"

const RENDER_PATH = {
    STATIC: 'index.handlebars',
    REAL_TIME_PRODUCTS: 'realTimeProducts.handlebars',
    MESSAGES: 'chat.handlebars'
}

export const viewsRouter = Router()

viewsRouter
    .get('/', async (req, res, next) => {
        try {
            const productList = await prod.getProducts()

            res.render(RENDER_PATH.STATIC, {
                headerTitle: 'Home | Products',
                mainTitle: 'List of products',
                list: [...productList],
                listExist: productList.length > 0
            })
        } catch (error) {
            return next(error.message)
        }
    })

    .get('/realtimeproducts', async (req, res, next) => {
        try {
            const productList = await prod.getProducts()

            res.render(RENDER_PATH.REAL_TIME_PRODUCTS, {
                headerTitle: 'Home | Products',
                mainTitle: 'List of products in Real Time',
                list: [...productList],
                showList: productList.length > 0
            })
        } catch (error) {
            return next(error.message)
        }
    })

    .get('/messages', async (req, res, next) => {
        try {
            const messages = await menMan.getMessages()
            console.log(messages)

            res.render(RENDER_PATH.MESSAGES, {
                headerTitle: 'Home | Products',
                mainTitle: 'List of messages'
            })
        } catch (error) {
            return next(error.message)
        }
    })