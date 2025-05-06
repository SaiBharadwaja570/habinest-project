import express from 'express';
import { User } from '../models/user.models.js';
import ApiError from '../utils/ApiError.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

const router = express.Router();

// register
router.post('/register', async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;

        const hashed = await bcrypt.hash(password, 10);

        
    
        const newUser = await User.create({
            name,
            phone,
            email, 
            password: hashed,
        })
    
        return res.status(200).json({ message: "New user created", data: newUser })
    
    } catch (error) {
        throw new ApiError(500, "User not created")
    }

})

// login

router.post('/login', async (req, res) => {
    
})




export default router