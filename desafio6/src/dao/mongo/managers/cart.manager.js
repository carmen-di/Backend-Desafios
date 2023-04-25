import mongoose from "mongoose"
import { cartModel, cartSchema } from "../models/cart.schema.js"

class CartManager {
    #cartsDb

    constructor() {
        this.#cartsDb = mongoose.model("carts", cartSchema)
    }

    async save(cart) {
        const cartSave = await this.#cartsDb.create(cart)
        return cartSave
    }

    async getCarts() {
        const carts = await this.#cartsDb.find().lean()
        return carts
    }
    
    async getCartById(id) {
        const cartFind = await this.#cartsDb.findById(id).lean().populate('products.product')
        if (!cartFind) {
            throw new Error("Not Found");
        }
        return cartFind;
    }

    async updateCart(cartId, cart) {
        const cartUp = await cartModel.findByIdAndUpdate(cartId, cart)
        return cartUp
    }

    async addProductToCart(cid, pid) {
        const cartIndex = await this.getCartById(cid)
        const productIndex = cartIndex.products.find((prod) => prod.id == pid)
        
        if (productIndex) {
            productIndex.quantity++
        } else {
            let product = { product: pid, quantity: 1 }
            cartIndex.products.push(product)
        }

        await this.updateCart(cid, cartIndex)
        return cartIndex

    }
    
    async deleteCartProduct(productId, cartId) {
        try {
            const carrito = await cartModel.updateOne({ _id: cartId }, { $pull: { products: { _id: productId } } })
			return carrito
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteAllProducts(cartId) {
        try {
            await cartModel.updateOne({ _id: cartId }, { $set: { products: [] } })
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateProduct(id, product, quantity) {
        try {
            await cartModel.updateOne({ _id: id, 'products.product': product }, { $set: { 'products.$.quantity': quantity } })
        } catch (error) {
            throw new Error(error)
        }
    }
}

export const cart = new CartManager()