import fs from 'fs';
import { ProductManager } from "./ProductManager.js"

export class Cart {
    constructor({ id, products }) {
        this.id = id
        this.products = products
    }
}

export class CartManager {

    #path
    #carts
    constructor(path) {
        this.#path = path;
        this.#carts = []
    }

    async #read() {
        const json = await fs.promises.readFile(this.#path, 'utf-8')
        this.#carts = JSON.parse(json)
    }

    async #write() {
        const newCart = JSON.stringify(this.#carts, null, 2)
        await fs.promises.writeFile(this.#path, newCart)
    }

    async save(cart) {
        await this.#read()
        this.#carts.push(cart)
        await this.#write()
        return cart
    }

    async getCarts() {
        await this.#read()
        return this.#carts
    }
    
    async getCartById(id) {
        await this.#read()
        const cartFind = this.#carts.find((carts) => carts.id === id)
        if (!cartFind) {
            console.log("Not found")
        } else {
            return cartFind
        }
    }
    
    async addProductToCart(cartId, productId) {
        await this.getCarts()
        const { cart } = await this.#carts.getCartById(cartId)
        const { prod } = await ProductManager.getProductById(productId)

        const productFind = cart.products.find(id => id.product == prod.id)
        if (productFind !== -1) {
            ++cart.products[productFind].quantity
            await this.#write()
        } 
        return {
            status_code: SUCCESS.INCREASE_QUANTITY.STATUS,
            productAdded: cart.products[productFind]
        }
    }
}