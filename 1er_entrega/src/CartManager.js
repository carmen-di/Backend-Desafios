import fs from 'fs';
import { randomUUID } from 'crypto';

export class CartManager {

    constructor(path) {
        this.carts;
        this.path = path;
    }

    async read() {
        const data = await fs.promises.readFile(this.path, "utf-8");
        this.carts = JSON.parse(data);
    }

    async getCarts() {
        await this.read();
        return this.carts;
    }

    async createCart(product) {
        await this.getCarts()
        const cart = [{"id":randomUUID(), }]
        cart.push(product)
        this.carts.push(cart)
        const jsonCarts = JSON.stringify(this.carts, null, 2)
        await fs.promises.writeFile(this.path, jsonCarts)
        
    }
    
    async getCartProdtById(id) {
        const carrito = await this.getCarts()
        const carritoFind = carrito.find((product) => product.id === id)
        if (!carritoFind) {
            console.log("Not found")
        } else {
            return carritoFind
        }
    }
    
    async addProductToCart(id, productId) { // Falta implementar

    }
}