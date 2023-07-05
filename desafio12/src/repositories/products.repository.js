import { productModel, productsDaoMongoose } from "../dao/mongo/products.dao.mongoose.js";
import { GenericRepository } from "./GenericRepository.js";

class ProductsRepository extends GenericRepository {
    constructor(dao) { super(dao) }

    async updateProduct(productId, product) {
        const result = await this.dao.updateById(productId, product)
        return result
    }
    async read(page, limit, category, status, sort) {
        const result = await this.dao.read(page, limit, category, status, sort)
        return result
    }
}

export const productosRepository = new ProductsRepository(productsDaoMongoose)