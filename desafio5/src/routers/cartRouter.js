import { Router } from "express";
import { Cart } from "../entidades/Cart.js"
import { cart } from "../dao/mongo/managers/cart.manager.js"
import { prod } from "../dao/mongo/managers/products.manager.js"

export const cartRouter = Router()

cartRouter.get('/', async (req, res, next) => {
    try {
        const carr = await cart.getCarts()
        res.json(carr)
    }
    catch (error) {
        next(error)
    }    
})

cartRouter.get('/:cid', async (req, res, next) => {
    try {
        const cartById = await cart.getCartById(req.params.cid)
        res.json(cartById)
    } 
    catch (error) {
        next(error)
    }
})

cartRouter.post('/', async (req, res, next) => {
    try {
        const carrito = new Cart({
            products: []
        })
        const agregar = await cart.save(carrito)
        res.json(agregar)
    } catch (error) {
        next(error)
    }
})

cartRouter.post('/:cid/products/:pid', async (req, res, next) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        const add = cart.addProductToCart(cartId, productId)
        res.json(add)
    } catch(error) {
        next(error)
    }
})
