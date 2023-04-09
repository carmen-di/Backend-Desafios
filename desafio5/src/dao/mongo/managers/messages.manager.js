import mongoose from "mongoose"
import { chatSchema } from "../models/chat.schema"

class MessagesManager {
    #messagesDb

    constructor() {
        this.#messagesDb = mongoose.model("messages", chatSchema)
    }

    async save(mensaje) {
        const mensajeSave = await this.#messagesDb.create(mensaje)
        return mensajeSave
    }

    async getMessages() {
        const message = await this.#messagesDb.find().lean()
        return message
    }

    async getMessageById(id) {
        const messages = await this.#messagesDb.findById(id).lean()
        return messages
    }
}

export const menMan = new MessagesManager()

