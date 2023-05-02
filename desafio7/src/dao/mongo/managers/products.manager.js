import mongoose from "mongoose"
import { productModel, productSchema } from "../models/products.schema.js"

class ProductManager {
    #productsDb

    constructor() {
        this.#productsDb = mongoose.model("products", productSchema);
    }

    // Revisar
    async read(page, limit, category, status, sort) {
        let options = {
            page: page || 1,
            limit: limit || 10
        }

        try {
            if(category) {
                const products = await productModel.paginate({ category: category }, options)
                return products
            }

            if(status) {
                const products = await productModel.paginate({ status: status }, options)
                return products
            }

            if(sort) {
                if(sort === "asc") {
                    options.sort = { price: 1 }
                    const products = await productModel.paginate({}, options)
					return products
                }
                if(sort === "desc") {
                    options.sort = { price: -1 }
                    const products = await productModel.paginate({}, options)
					return products
                }
            }

            const products = await productModel.paginate({}, options)
            return products
        } catch (error) {
            next(error)
        }
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