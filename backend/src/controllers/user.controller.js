import User from "../models/user.models.js";
import bcrypt from 'bcrypt'
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// A controller containing the functionalities required for a user model

const generateAccessAndRefreshToken = async (userId) => {
    
    try {
        
        const user = await User.findById(userId)
        const accessToken =  user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken;

        await user.save({validateBeforeSave: false})

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens")
    }
}

// Register
const registerUser = asyncHandler(async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;
    
        if( !email || !password || !name || !phone ) throw new ApiError(400, "Please enter all the fields")
    
        const userExist = await User.findOne({
            $or: [ {email}, {name} ]
        })

        const hashed = await bcrypt.hash(password, 10);
        
        if(!hashed) throw new ApiError(500, "Internal server error! Password not hashed!")
    
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

        const isPassCorrect = await user.isPasswordCorrect(password);
        if( !isPassCorrect ) throw new ApiError( 401 , "Password is incorrect");

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
        
        const options = {
            httpOnly: true,
            secure: true 
       }

        
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json( new ApiResponse( 200, {}, "User logged in successfully!!" ) )

    } catch (error) {
        throw new ApiError(500, "Internal server Error: " + error)
    }
})

export {
    registerUser,
    loginUser
}