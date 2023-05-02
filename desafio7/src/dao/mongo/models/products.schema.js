import mongoose from "mongoose"
import { Schema } from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
import mongoosePaginate from "mongoose-paginate-v2"

const productsCollection = 'products'

const productSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true,  unique: true },
    price: { type: Number, required: true },
    status: { type: Boolean, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnail: { type: Array }
  }, { versionKey: false })

  productSchema.plugin(mongooseAggregatePaginate)
  productSchema.plugin(mongoosePaginate)
  
  export const productModel = mongoose.model(productsCollection, productSchema)
  
  export  { productSchema }