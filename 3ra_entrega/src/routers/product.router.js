import { Router } from "express";
import * as productsController from "../controllers/products.controller.js"
import { isAdmin } from "../middleware/auth.js"

export const productRouter = Router()

productRouter.get('/', productsController.handleGet)

// obtener producto segun su id
productRouter.get('/:pid', productsController.handleGetById)

// crear nuevo producto
productRouter.post('/', isAdmin, productsController.handlePost)

// actualizar el producto según su id
productRouter.put('/:pid', isAdmin, productsController.handlePut)

// eliminar producto según su id
productRouter.delete('/:pid', isAdmin, productsController.handleDelete)