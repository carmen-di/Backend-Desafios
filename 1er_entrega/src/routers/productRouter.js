import { Router } from "express";
import { Product, ProductManager } from "../ProductManager.js"
import { randomUUID } from "crypto"

export const productRouter = Router()

const prod = new ProductManager('./database/products.json')

productRouter.get('/', async (req, res, next) => {
    try {
        const limit = req.query.limit
        const productos = await prod.getProducts()

        if (!limit) {
            res.json(productos)
        } else {
            const productLimit = [];
            for (let i = 0; i < limit && i < 10; i++) {
                productLimit.push(productos[i])
            }
            res.json(productLimit);
        }
    }
    catch (error) {
        next(error)
    }    
})

productRouter.get('/:pid', async (req, res, next) => {
    try {
        const id = parseInt(req.params.pid)
        const productById = await prod.getProductById(id)

        if (!productById) {
            res.json({error: 'El producto no existe'})
        } else {
            res.json(productById)
        }
    } 
    catch (error) {
        next(error)
    }
})

productRouter.post('/', async (req, res, next) => {
    try {
        const producto = new Product ({id: randomUUID(), ...req.body})
        const add = await prod.save(producto)
        res.json(add)
    }
    catch (error) {
        next(error)
    }
})

productRouter.put('/:pid', async (req, res, next) => {
    try {
        const prodUp = await prod.updateProduct(req.params.pid, req.body)
        res.json(prodUp)
    }
    catch (error) {
        next(error)
    }
})

productRouter.delete('/:pid', async (req, res, next) => {
    try {
        const borrar = await prod.deleteProduct(req.params.pid)
        res.json(borrar)
    }
    catch (error) {
        next(error)
    }
})