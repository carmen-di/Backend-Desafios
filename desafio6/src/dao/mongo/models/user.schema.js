import mongoose from "mongoose";

const usersCollection = 'users';

const usersSchema = mongoose.Schema({
    firstName:{
        type: String,
        require: true
    },
    lastName:{
        type: String,
        require: true
    },
    email:{
        type: String,
        unique: true,
        require: true
    },
    age: Number,
    password: {
        type: String,
        require: true
    }
})

const usersModel = mongoose.model(usersCollection, usersSchema)


export default usersModel