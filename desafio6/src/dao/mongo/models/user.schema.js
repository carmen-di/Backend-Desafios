import mongoose from "mongoose";

const usersCollection = 'users';

const usersSchema = new mongoose.Schema({
    name:{ type: String, require: true },
    email:{ type: String, unique: true, require: true },
    password: { type: String, require: true }
}, {versionKey: false})

export const usersModel = mongoose.model(usersCollection, usersSchema)


