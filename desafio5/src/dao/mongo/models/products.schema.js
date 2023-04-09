import mongoose from "mongoose"
import { Schema } from "mongoose"

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: Boolean, required: true },
    stock: { type: Number, required: true },
    ref: { type: Number, required: true },
    thumbnail: { type: Array }
  })
  
  export { productSchema }