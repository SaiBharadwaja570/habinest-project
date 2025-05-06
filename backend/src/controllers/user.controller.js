import { User } from "../models/user.models.js";
import bcrypt from 'bcrypt'
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";


// Register

const registerUser = asyncHandler(async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;
    
        const hashed = await bcrypt.hash(password, 10);

        if( !email || !password || !name || !phone ) throw new ApiError(400, "Please enter all the fields")
    
        const userExist = await User.findOne({
            $or: [ {email}, {name} ]
        })
    
        if(userExist) throw new ApiError(409, "User already exist");
    
        const newUser = await User.create({
            name, 
            phone, 
            email, 
            password: hashed
        })

        return res.status(201).json({ message: "User created", data: newUser });
        
    
    } catch (error) {
        throw new ApiError(500, "Internal server error! User not created!")
    }

})



export {
    registerUser
}