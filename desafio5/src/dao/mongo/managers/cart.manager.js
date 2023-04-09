import mongoose from "mongoose"
import { cartSchema } from "../models/cart.schema.js"

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
        const cartFind = await this.#cartsDb.findById(id).lean();
        if (!cartFind) {
            throw new Error("Not Found");
        }
        return cartFind;
    }
    
    //REVISAR!!
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
}

export const cart = new CartManager()