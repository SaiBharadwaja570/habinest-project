// A model containing the required schema for the user 

import mongoose, { Schema } from "mongoose";
import bcrpt from 'bcrypt'

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// methods 

User.methods.isPasswordCorrect = async function(password){
    return await bcrpt.compare(password, this.password);
}

export const User = mongoose.model('User', userSchema);