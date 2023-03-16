import fs from 'fs'

export class Product {
    constructor({title, description, price, id, thumbnail, code, stock, category}) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = [thumbnail];
        this.code = code;
        this.stock = stock;
        this.category = category;
        this.id = id;
    }
}

export class ProductManager {
    #path
    #productos
    
    constructor(path) {
        this.#path = path;
        this.#productos = []
    }

    async #read() {
        const json = await fs.promises.readFile(this.#path, 'utf-8')
        this.#productos = JSON.parse(json)
    }

    async #write() {
        const newProduct = JSON.stringify(this.#productos, null, 2)
        await fs.promises.writeFile(this.#path, newProduct)
    }

    async save(productos) {
        await this.#read()
        this.#productos.push(productos)
        await this.#write()
        return productos
    }

    async getProducts() {
        await this.#read()
        return this.#productos
    }

    async getProductById(id) {
        await this.#read()
        const productFind = this.#productos.find((product) => product.id === id)
        if (!productFind) {
            console.log("Not found")
        } else {
            return productFind
        }
    }

    async updateProduct(id, upProduct) {
        await this.#read()
        const productIndex = this.#productos.findIndex((product) => product.id === id);
        if (productIndex === -1) {
            console.log("Not found")
        } else {
            this.#productos[productIndex] = {...upProduct, id}
            await this.#write()
            console.log("Producto actualizado correctamente")
        }
    }

    
    async deleteProduct(id) {
        await this.#read()
        const productEliminar = this.#productos.findIndex((product) => product.id === id);
        if (productEliminar === -1) {
            console.log("Not found")
        } 
        const [eliminar] = this.#productos.splice(productEliminar, 1)
        await this.#write()
        return eliminar
    }
}
