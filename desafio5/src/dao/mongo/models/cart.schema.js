import { Schema } from 'mongoose'

const cartSchema = new Schema({
    products: { type: Array, default: [] }
})

export { cartSchema }