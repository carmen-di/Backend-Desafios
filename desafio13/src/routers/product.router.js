import { Router } from "express";
import * as productsController from "../controllers/products.controller.js"
import { isAdmin, isAdminOrPremium } from "../middleware/auth.js"

export const productRouter = Router()

productRouter.get('/', productsController.handleGet)

// obtener producto segun su id
productRouter.get('/:pid', productsController.handleGetById)

// crear nuevo producto
productRouter.post('/', isAdminOrPremium, productsController.handlePost)

// actualizar el producto según su id
productRouter.put('/:pid', isAdmin, productsController.handlePut)

// eliminar producto según su id
productRouter.delete('/:pid', isAdminOrPremium, productsController.handleDelete)