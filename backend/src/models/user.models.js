// A model containing the required schema for the user 

import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userDB from "../db/userDB.js";

const userSchema = new mongoose.Schema({
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
    },
    type: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true
    },
    preferences: Object,
    bookmarks: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Listingts'
    }]
})

// to hash updated password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10);
    next();
})

// Method to compare passwords
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d' // Default to 1 hour if not defined
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d' // Default to 7 days if not defined
        }
    )
}
const db = await userDB();
const User = db.model('User', userSchema);

export default User;