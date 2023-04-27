import { Router } from "express";
import { Product } from "../entidades/Product.js"
import { prod } from "../dao/mongo/managers/products.manager.js"

export const productRouter = Router()

productRouter.get('/', async (req, res, next) => {
    const { limit, page, category, status, sort } = req.query

    try {
        let product = await prod.read(page, limit, category, status, sort)

        const productExist = () => {
            if(Boolean(product.docs)) return "success"
            else return "error"
        }
        res.send({
            status: productExist(),
            payload: product.docs,
            totalDocs: product.totalDocs,
            limit: product.limit,
            totalPages: product.totalPages,
            page: product.page,
            pagingCounter: product.pagingCounter,
            hasPrevPage: product.hasPrevPage,
            hasNextPage: product.hasNextPage,
            prevLink: product.prevPage,
            nextLink: product.nextPage
        })
    } catch (error) {
        next(error)
    }
})

productRouter.get('/:pid', async (req, res, next) => {
    try {
        const idProducto = await prod.getProductById(req.params.pid)
        res.json(idProducto)
    } 
    catch (error) {
        next(error)
    }
})

productRouter.post('/', async (req, res, next) => {
    try {
        const producto = new Product (req.body)
        const add = await prod.save(producto.datos())
        res.json(add)
    }
    catch (error) {
        next(error)
    }
})

productRouter.put('/:pid', async (req, res, next) => {
    try {
        const producto = new Product (req.body)
        const prodUp = await prod.updateProduct(req.params.pid, producto.datos())
        res.json(prodUp)
        console.log(producto)
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