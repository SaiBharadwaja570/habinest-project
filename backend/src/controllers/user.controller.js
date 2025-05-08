import { User } from "../models/user.models.js";
import bcrypt from 'bcrypt'
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from 'jsonwebtoken'

// A controller containing the functionalities required for a user model

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

        return res.status(201).json(new ApiResponse(201, { data: newUser }, "User created succesfully!!"));
        
    
    } catch (error) {
        throw new ApiError(500, "Internal server error! User not created!")
    }

})


// Login

const loginUser = asyncHandler(async (req, res) => {
    try {
        
        const { email, password } = req.body;

        if( !email || !password ) throw new ApiError(400, "Please enter all the fields");

        const user = await User.findOne({ email });

        if(!user) throw new ApiError(500, "User not found!");

        const isPasswordCorrect = user.isPasswordCorrect(password);
        

        if( !isPasswordCorrect ) throw new ApiError( 401 , "Please enter all the fields");

        let payload={
            id:user._id,
            name:user.name
        }
        const secretToken=process.env.SECRET_TOKEN;
        jwt.sign(payload, secretToken, (err, token)=>{
            if(err) throw new ApiError(500, err.message);
            return res.status(200).json(new ApiResponse(200, token, "User logged in successfully!!"));
        })
        

        // return res.status(200).json( 200, {}, "User logged in successfully!!" )


    } catch (error) {
        throw new ApiError(500, "Internal server Error: " + error)
    }
})


export {
    registerUser,
    loginUser
}