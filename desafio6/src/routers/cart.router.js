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

// actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body    
cartRouter.put("/:cid/products/:pid", async (req, res, next) => {
    const { cid, pid } = req.params
    const { quantity } = req.body

    try {
        const newCart = await cart.updateProduct(cid, pid, quantity)
        res.json(newCart)

    } catch (error) {
        res.status(500).send(error.message)
    }
})

// eliminar todos los productos del carrito
cartRouter.delete("/:cid", async (req, res, next) => {
    try {
        const { cid } = req.params
        const carrito = await cart.getCartById(cid)
        if (carrito) {
            const newCart = await cart.deleteAllProducts(cid)
            res.json(newCart)
        }
        res.json({ msg: `El carrito con el id ${cid} no existe.` })
    } catch (error) {
        next(error)
    }
})

// eliminar del carrito el producto seleccionado
cartRouter.delete("/:cid/products/:pid", async (req, res, next) => {
    try {
        const { cid, pid } = req.params
        const product = await prod.getProductById(pid)
        if (product._id) {
            const cart = await cart.deleteCartProduct(pid, cid)
            res.json(cart)
            return
        }
        res.json({ msg: `El producto con el id ${pid} no existe.` })
    } catch (error) {
        next(error)
    }
})
