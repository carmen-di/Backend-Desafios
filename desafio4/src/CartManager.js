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

    constructor(path) {
        this.#path = path;
        this.carts;
        this.products = [];
    }

    async #read() {
        const json = await fs.promises.readFile(this.#path, 'utf-8')
        this.carts = JSON.parse(json)
    }

    async #write() {
        const newCart = JSON.stringify(this.carts, null, 2)
        await fs.promises.writeFile(this.#path, newCart)
    }

    async save(cart) {
        await this.#read()
        this.carts.push(cart)
        await this.#write()
        return cart
    }

    async getCarts() {
        await this.#read()
        return this.carts
    }
    
    async getCartById(id) {
        const cart = await this.getCarts()
        const cartFind = cart.find((carts) => carts.id === id)
        if (!cartFind) {
            console.log("Not found")
        } else {
            return cartFind
        }
    }
    
    async addProductToCart(cid, pid) {
        try {
            const pm = new ProductManager('./products.json');

            const productos = await pm.getProducts()
            const prodIndex = productos.findIndex(prod => prod.id == pid)
            const prodFil = productos[prodIndex]

            const car = await this.getCarts()
            const carIndex = car.findIndex(carrito => carrito.id == cid)
            const carFil = carritos[carIndex]

            let cant = 1
            const produID = {
                "id": `${prodFil.id}`,
                "quantity": `${cant}`
            };

            const idInCar = [];
            const carritoProds = carFil.products
            carritoProds.forEach(element => {
                idInCar.push(element.id)
            });

            if (idInCar.includes(pid)) {
                const prodInCarrito = carritoProds.find(element => element.id == pid)
                prodInCarrito.quantity++;
                carFil.quantity++;
                await this.#write()
            } else {
                const push = carritoProds.push(produID)
                carFil.quantity++;
                this.carts[carIndex].products = carritoProds
                await this.#write()
            }
            await this.#write()
            return { "message": "producto cargado correctamente"  }
        } catch (error) {
            return error.message
        }

    }
}