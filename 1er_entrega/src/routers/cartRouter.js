import { Router } from "express";
import { CartManager } from "../CartManager.js";
import { ProductManager } from "../ProductManager.js"
import { randomUUID } from "crypto"

export const cartRouter = Router()

const cart = new CartManager('./database/carts.json')
const prod = new ProductManager('./database/products.json')

cartRouter.get('/', async (req, res, next) => {
    try {
        const carrito = await cart.getCarts
        res.json(carrito)
    }
    catch (error) {
        next(error)
    }    
})

cartRouter.get('/:cid', async (req, res, next) => {
    try {
        const cartById = await cart.getCartProdtById(req.params.cid)
        res.json(cartById)
    } 
    catch (error) {
        next(error)
    }
})

cartRouter.post('/', async (req, res, next) => {
    try {
        const carrito = new CartContainer({
            products: [],
            id: randomUUID()
        })
        const agregar = await cart.createCart(carrito)
        res.json(agregar)
    } catch (error) {
        next(error)
    }
})

cartRouter.post('/:cid/product/:pid', async (req, res, next) => {
    try {
        const {cid, pid} = req.params
        const product = await cart.getCartProdtById(pid)
        if (product.id) {
            const cart = await cart.addProductToCart(cid, pid)
            res.json(cart)
            return
        }
        res.json({ msg: `El producto con el id ${pid} no existe.` })
    } catch (error) {
        next(error)
    }
})
