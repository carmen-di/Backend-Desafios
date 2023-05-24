import mongoose from "mongoose";

const usersCollection = 'users';

const usersSchema = new mongoose.Schema({
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    age: { type: Number, require: true },
    email:{ type: String, unique: true, require: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user'},
    password: { type: String, require: true },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts',
    }
}, {versionKey: false})

export const usersModel = mongoose.model(usersCollection, usersSchema)


export { usersSchema }


