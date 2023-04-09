import { Schema } from 'mongoose'

const chatSchema = new Schema({
  user: { type: String, required: true },
  message: { type: String, required: true }
})

export { chatSchema }