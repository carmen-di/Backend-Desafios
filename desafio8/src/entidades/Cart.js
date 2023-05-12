export class Cart {
    #id
    #products

    constructor({ products }) {
        this.#products = products
    }

    get id() { 
        return this.#id 
    }
    
    get products() { 
        return this.#products 
    }

    datos() {
        return {
            id: this.#id,
            products: this.#products,
        }
    }
}