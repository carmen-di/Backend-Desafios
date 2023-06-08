import { Router } from "express";
import * as cartsController from "../controllers/carts.controller.js"
import { isUser } from "../middleware/auth.js";

export const cartRouter = Router()

// obtener carritos
cartRouter.get('/', cartsController.handleGet)

// obtener carrito por id
cartRouter.get('/:cid', cartsController.handleGetById)

// crear carrito
cartRouter.post('/', cartsController.handlePost)

// agregar producto al carrito
cartRouter.post('/:cid/products/:pid', isUser, cartsController.handlePostProduct)

// actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body.
cartRouter.put("/:cid/products/:pid", isUser, cartsController.handlePut)

// eliminar todos los productos del carrito
cartRouter.delete("/:cid", isUser, cartsController.handleDeleteCart)

// eliminar del carrito el producto seleccionado
cartRouter.delete("/:cid/products/:pid", isUser, cartsController.handleDeleteProduct)

// finalizar compra
cartRouter.get("/:cid/purchase", cartsController.finalizePurchase)

