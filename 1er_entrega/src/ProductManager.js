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

    constructor(path) {
        this.#path = path;
        this.productos = []
    }

    async #read() {
        const json = await fs.promises.readFile(this.#path, 'utf-8')
        this.productos = JSON.parse(json)
    }

    async #write() {
        const newProduct = JSON.stringify(this.productos, null, 2)
        await fs.promises.writeFile(this.#path, newProduct)
    }

    async save(productos) {
        await this.#read()
        this.productos.push(productos)
        await this.#write()
        return productos
    }

    async getProducts() {
        await this.#read()
        return this.productos
    }

    async getProductById(id) {
        await this.#read()
        const productFind = this.productos.find((product) => product.id === id)
        if (!productFind) {
            console.log("Not found")
        } else {
            return productFind
        }
    }

    async addProduct(title, description, price, thumbnail, stock, code,category) {
        const products = await this.getProducts();
        const codeOk = this.productos.some((product) => title === product.title)

        if (codeOk) {
            return console.log("Ingrese otro code")
        } else {
            if (title && description && price && thumbnail && code && stock) {
                const newProduct = new Product ({
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    stock: stock,
                    code: code,
                    category: category  
                })
                this.productos.push(newProduct)
                await fs.promises.writeFile(this.#path, JSON.stringify(products, null, 2))
                console.log("Producto agregado correctamente")
				return newProduct
			} else {
				return console.log("Ingrese todos los campos")
			}
        }
    }

    async updateProduct(id, upProduct) {
        await this.#read()
        const productIndex = this.productos.findIndex((product) => product.id === id);
        if (productIndex === -1) {
            console.log("Not found")
        } else {
            this.productos[productIndex] = {...upProduct, id}
            await this.#write()
            console.log("Producto actualizado correctamente")
        }
    }

    async deleteProduct(id) {
        await this.#read()
        const productEliminar = this.productos.findIndex((product) => product.id === id);
        if (productEliminar === -1) {
            console.log("Not found")
        } 
        const [eliminar] = this.productos.splice(productEliminar, 1)
        await this.#write()
        return eliminar
    }
}