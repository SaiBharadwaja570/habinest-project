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

const refresAccessToken = asyncHandler(async (req, res) =>{
    const incomingToken = req.cookie.refreshToken || req.cookie.refreshToken;


})

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
        .json( new ApiResponse( 200, {user: user, accessToken, refreshToken}, "User logged in successfully!!" ) )

    } catch (error) {
        throw new ApiError(500, "Internal server Error: " + error)
    }
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set : { 
                // We will be removing the access token because we don't want him to logout again 
                refreshToken: undefined
             }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true 
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json( new ApiResponse(200, {}, "User logged out successfully!") )
})


const updatePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword} = req.body;


    const user = await User.findById(req.user._id);

    if(!user) throw new ApiError( 401, "Unauthorized access");

    const isPassCorrect = await user.isPasswordCorrect(oldPassword);

    if(!isPassCorrect) throw new ApiError(401, "Enter the correct previous password")

    user.password = newPassword;

    await user.save({ validateBeforeSave: false });

    return res
    .status(200)
    .json( new ApiResponse(200, {} ,"Password Updated successfully") )

})

const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user);
    return res
    .status(200)
    .json( new ApiResponse(200, user, "User fetched Successfully") )
})

const updateAccountInfo = asyncHandler(async (req, res) => {
    const { name, phone, email } = req.body;

    if (!name || !phone || !email) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set : {
                name,
                phone,
                email
            }
        },
        {
            new: true
        }
    ).select("-password");

    return res
    .status(200)
    .json( new ApiResponse(200, user, "User Information updated!!") )
})


export {
    registerUser,
    loginUser,
    logoutUser,
    updatePassword,
    getCurrentUser,
    updateAccountInfo
}