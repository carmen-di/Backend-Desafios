import { Cart } from "../models/Cart.js";
import { cartsRepository } from "../repositories/cart.repository.js";
import { productosRepository } from "../repositories/products.repository.js";
import { ticketsRepository } from "../repositories/tickets.repository.js";
import { getCurrentSessionController } from "./session.controller.js";

export async function handleGet(req, res, next) {
    try {
        const carritos = await cartsRepository.obtenerTodos()
        res.json(carritos)
    } catch (error) {
        next(error)
    }
}

export async function handleGetById(req, res, next) {
    try {
        const carrito = await cartsRepository.obtenerSegunId(req.params.cid)
        res.json(carrito)
    } catch (error) {
        next(error)
    }
}

export async function handlePost(req, res, next) {
    try {
        const carrito = new Cart({
            products: []
        })
        const cart = await cartsRepository.create(carrito.datos())
        res.json(cart)
    } catch (error) {
        next(error)
    }
}

export async function handlePostProduct(req, res, next) {
    try {
        const { cid, pid } = req.params
        const product = await productosRepository.obtenerSegunId(pid)
        if (product._id) {
            const cart = await cartsRepository.addProductToCart(pid, cid)
            res.json(cart)
            return
        }
        res.json({ msg: `El producto con el id ${pid} no existe.` })
    } catch (error) {
        next(error)
    }
}

export async function handlePut(req, res, next) {
    const { cid, pid } = req.params
    const { quantity } = req.body

    try {
        const newCart = await cartsRepository.updateProduct(cid, pid, quantity)
        res.json(newCart)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function handleDeleteCart(req, res, next) {
    try {
        const { cid } = req.params
        const carrito = await cartsRepository.obtenerSegunId(cid)
        if (carrito) {
            const newCart = await cartsRepository.deleteAllProducts(cid)
            res.json(newCart)
        }
        res.json({ msg: `El carrito con el id ${cid} no existe.` })
    } catch (error) {
        next(error)
    }
}

export async function handleDeleteProduct(req, res, next) {
    try {
        const { cid, pid } = req.params
        const product = await productosManager.obtenerSegunId(pid)
        if (product._id) {
            const cart = await cartsRepository.deleteProductFromCart(pid, cid)
            res.json(cart)
            return
        }
        res.json({ msg: `El producto con el id ${pid} no existe.` })
    } catch (error) {
        next(error)
    }
}

export async function finalizePurchase(req, res, next) {
    const { cid } = req.params

    try {
        const cart = await cartsRepository.obtenerSegunIdPop(cid)
        const unavaliableProducts = []
        let totalAmount = 0

        for (const item of cart.products) {
            const product = item.product
            const quantity = item.quantity
            const productInStock = await productosRepository.obtenerSegunId(product)

            if (productInStock && productInStock.stock >= quantity) {
                productInStock.stock -= quantity
                await productInStock.save()
                totalAmount += productInStock.price * quantity
                cartsRepository.deleteProductFromCart(cid, product._id)
            } else {
                unavaliableProducts.push(product)
            }
        }
    
    // ticket
        await ticketsRepository.createTicket(totalAmount, "romartinez@live.com")
        await cartsRepository.deleteAllProducts(cid)

        res.status(200).send({ message: 'Successful purchase', unavaliableProducts: unavaliableProducts });
    } catch (error) {
        res.status(500).send(error.message)
    }
}