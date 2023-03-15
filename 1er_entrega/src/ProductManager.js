import fs from 'fs'

export class ProductManager {
    
    constructor(path) {
        this.path = path;
    }

    async addProduct(prodNuevo) {
        const products = await this.getProducts();
        const codeOk = products.some((product) => prodNuevo.code === product.code)

        if (codeOk) {
            return console.log("Ingrese otro code")
        } else {
            if (prodNuevo.title && prodNuevo.description && prodNuevo.price && prodNuevo.thumbnail && prodNuevo.code && prodNuevo.stock) {
                const newProduct = {
                    title: prodNuevo.title,
                    description: prodNuevo.description,
                    price: prodNuevo.price,
                    thumbnail: prodNuevo.thumbnail,
                    stock: prodNuevo.stock,
                    code: prodNuevo.code,
                    id: products.length + 1
                }
				products.push(newProduct)
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
                console.log("Producto agregado correctamente")
				return newProduct
			} else {
				return console.log("Ingrese todos los campos")
			}
        }
    }

    async getProducts() {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            console.log(data);
            const products = JSON.parse(data);
            return products;
        }
        else{
            return [] 
        }
    }
    
    async getProductById(id) {
        const productos = await this.getProducts()
        const productFind = productos.find((product) => product.id === id)
        if (!productFind) {
            console.log("Not found")
        } else {
            return productFind
        }
    }

    async updateProduct(id, upProduct) {
        const productos = await this.getProducts()
        const productIndex = productos.findIndex((product) => product.id === id);
        if (productIndex === -1) {
            console.log("Not found")
        } else {
            productos[productIndex] = {...upProduct, id}
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2))
            console.log("Producto actualizado correctamente")
        }
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const productEliminar = products.findIndex((product) => product.id === id);

        if (productEliminar === -1) {
            console.log("Not found")
        } else {
            products.splice(productEliminar, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
            console.log("Producto eliminado correctamente")
        }
    }
}
