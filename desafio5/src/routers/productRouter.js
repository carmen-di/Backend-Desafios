import { Router } from "express";
import { Product } from "../entidades/Product.js"
import { prod } from "../dao/mongo/managers/productos.manager.js"
import { randomUUID } from "crypto"

export const productRouter = Router()

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
        const idProducto = req.params.pid
        const poductosLeidos = await prod.getProducts()
    
        if (idProducto) {
            let filtrado = poductosLeidos.find((prod) => prod.id === idProducto)
            if (filtrado) {
                res.send(filtrado)
            } else {
                throw new Error("no existe el id")
            }
        }
    } 
    catch (error) {
        next(error)
    }
})

productRouter.post('/', async (req, res, next) => {
    try {
        await prod.getProducts()
        const producto = new Product ({ ...req.body, id: randomUUID()})
        const add = await prod.addProduct(producto.title, producto.description, producto.price, producto.thumbnail, producto.stock, producto.code, producto.category)
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