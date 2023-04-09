import mongoose from "mongoose"
import { productSchema } from "../models/products.schema.js"

class ProductManager {
    #productsDb

    constructor() {
        this.#productsDb = mongoose.model("products", productSchema);
    }

    async save(productos) {
        const productSave = await this.#productsDb.create(productos)
        return productSave
    }

    async getProducts() {
        const products = await this.#productsDb.find().lean()
        return products
    }

    async getProductById(id) {
        const product = await this.#productsDb.findById(id).lean()
        return product
    }

    async updateProduct(id, upProduct) {
        const productIndex = await this.#productsDb.findById(id).lean();
        if (!productIndex) {
        throw new Error("Not Found");
        }
        await this.#productsDb.findByIdAndUpdate(id, upProduct);
    }

    async deleteProduct(id) {
        const producto = await this.getProductById(id)
        const productEliminar = await this.#productsDb.deleteOne(producto)
        if (!productEliminar) {
            throw new Error("Not Found");
        }
        return productEliminar
    }
}

export const prod = new ProductManager()