import mongoose, { Schema } from "mongoose"
import { DaoMongoose } from "./DaoMongoose.js"

const ticketsCollection = "tickets"

const ticketSchema = new mongoose.Schema({
    code: {type: String},
    amount: {type: Number, required: true},
    purchaser: {type: String, required: true}
}, {versionKey: false})

ticketSchema.set("timestamps", {
    createdAt: "purchase_datetime"
})

export const ticketModel = mongoose.model(ticketsCollection, ticketSchema)

export const ticketsDaoMongoose = new DaoMongoose(ticketModel)