import mongoose, { Schema } from "mongoose";

const ownerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

export const Owner = mongoose.model('Owner', ownerSchema); 