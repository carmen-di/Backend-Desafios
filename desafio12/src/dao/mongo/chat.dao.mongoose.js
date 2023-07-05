import mongoose from 'mongoose'
import { DaoMongoose } from './DaoMongoose.js'

const messagesCollection = 'messages'

const chatSchema = new mongoose.Schema({
    user: { type: String, required: true },
    message: { type: String, required: true }
}, { versionKey: false })

const messageModel = mongoose.model(messagesCollection, chatSchema)

export const messagesDaoMongoose = new DaoMongoose(messageModel)