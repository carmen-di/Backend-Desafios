function toPojo(object) {
    return JSON.parse(
        JSON.stringify(
            object
        )
    )
}

export class DaoMongoose {
    #model
    constructor(mongooseModel) {
        this.#model = mongooseModel
    }
    
    get model() { return this.#model }

    async create(element) {
        const pojo = toPojo(await this.#model.create(element))
        return pojo
    }
    
    async getAll() {
        const result = await this.#model.find()
        return result
    }

    async getById(id) {
        const result = await this.#model.findById(id).populate()
        return result
    }

    async getByIdWithPopulate(id) {
        const result = await this.#model.findById(id).populate("products.product").lean()
        return result
    }

    async findByEmail(email) {
        const result = await this.#model.findOne({ email })
        return result
    };

    async deleteById(id) {
        const elemento = await this.#model.findByIdAndDelete(id)
        return elemento
    }

    async readOne(criteria) {
        const result = await this.#model.findOne(criteria).select({ _id: 0 }).lean()
        if (!result) throw new Error('NOT FOUND')
        return result
    }

    async readMany(criteria) {
        const result = await this.#model.find(criteria).select({ _id: 0 }).lean()
        return result
    }

    async updateById(cartId, cart) {
        const result = await this.#model.findByIdAndUpdate(cartId, cart)
        return result
    }

    async createTicket(totalAmount, purchaser) {
        const ticket = new this.#model({
            amount: totalAmount,
            purchaser: purchaser,
            code: newCode()
        });
        await ticket.save();
    };

    async deleteProdFromCart(productId, cartId) {
        const result = await this.#model.updateOne({ _id: cartId }, { $pull: { products: { _id: productId } } })
        return result
    }

    async deleteAll(cartId) {
        const result = await this.#model.updateOne({ _id: cartId }, { $set: { products: [] } })
        return result
    }

    async updateProd(cartId, productId, quantity) {
        const result = await this.#model.updateOne({ _id: cartId, 'products.product': productId }, { $set: { 'products.$.quantity': quantity } })
        return result
    }

    async updateOne(criteria, newData) {
        const modifiedUser = await this.#model.findOneAndUpdate(criteria, newData, { new: true, projection: { _id: 0 } }).lean()
        if (!modifiedUser) throw new Error('NOT FOUND')
        delete modifiedUser._id
        return modifiedUser
    }
    
    async updateMany(criteria, newData) {
        await this.#model.updateMany(criteria, newData)
    }
    
    async deleteOne(criteria) {
        const deletedUser = await this.#model.findOneAndDelete(criteria, { projection: { _id: 0 } }).lean()
        if (!deletedUser) throw new Error('NOT FOUND')
        delete deletedUser._id
        return deletedUser
    }
    
    async deleteMany(criteria) {
        await this.#model.deleteMany(criteria)
    }
    
    // POPULATIONS ----------------------------------------------------------
    
    async readOnePopulated(criteria, localField, from, foreignField) {
        const [result] = await this.model.aggregate([
            { $match: criteria },
            { $limit: 1 },
            {
            $lookup: {
                from,
                localField,
                foreignField,
                as: localField,
                pipeline: [{ $project: { "_id": false } }],
            }
            },
            { $project: { "_id": false } }
        ])
        
        if (!result) throw new Error('NOT FOUND')
        delete result._id
        return result
    }
    
    async readManyPopulated(criteria, localField, from, foreignField) {
        const result = await this.model.aggregate([
            { $match: criteria },
            {
            $lookup: {
                from,
                localField,
                foreignField,
                as: localField,
                pipeline: [{ $project: { "_id": false } }],
            }
            },
            { $project: { "_id": false } }
        ])
        return result
    }
    
    async read(page, limit, category, status, sort) {
        let options = {
            page: page || 1,
            limit: limit || 10
        }
    
        try {
            if(category) {
                const products = await this.#model.paginate({ category: category }, options)
                return products
            }
    
            if(status) {
                const products = await this.#model.paginate({ status: status }, options)
                return products
            }
    
            if(sort) {
                if(sort === "asc") {
                    options.sort = { price: 1 }
                    const products = await this.#model.paginate({}, options)
                    return products
                }
                if(sort === "desc") {
                    options.sort = { price: -1 }
                    const products = await this.#model.paginate({}, options)
                    return products
                }
            }
    
            const products = await this.#model.paginate({}, options)
            return products
        } catch (error) {
            next(error)
        }
    }
}