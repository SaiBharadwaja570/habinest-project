// A model containing the required schema for the user 

import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
})

// Method to compare passwords
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model('User', userSchema);