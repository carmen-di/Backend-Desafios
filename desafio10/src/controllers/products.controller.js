import { Product } from "../models/Product.js";
import { productosRepository } from "../repositories/products.repository.js";

export async function handleGet(req, res, next) {
    const { limit, page, category, status, sort } = req.query
    
    try {
        let product = await productosRepository.read(page, limit, category, status, sort)

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
}

export async function handleGetById(req, res, next) {
    try {
        const producto = await productosRepository.obtenerSegunId(req.params.pid)
        res.json(producto)
    } catch (error) {
        next(error)
    }
}

export async function handlePost(req, res, next) {
    try {
        const producto = new Product(req.body)
        const productoGuardado = await productosRepository.create(producto.datos())
        res.json(productoGuardado)
    } catch (error) {
        next(error)
    }
}

export async function handlePut(req, res, next) {
    try {
        const producto = new Product(req.body)
        const productoReemplazado = await productosRepository.updateProduct(req.params.pid, producto.datos())
        res.json(productoReemplazado)
    } catch (error) {
        return next(error)  
    }
}

export async function handleDelete(req, res, next) {
    try {
        const borrada = await productosRepository.borrarSegunId(req.params.pid)
        res.json(borrada)
    } catch (error) {
        next(error)
    }
}
