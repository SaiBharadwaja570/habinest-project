import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// Common cookie options
const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // ✅ 1 day from now
}

// Utility function to generate tokens
const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Error generating tokens");
    }
};

// Register User
const registerUser = asyncHandler(async (req, res) => {
    const { name, phone, email, password, type='user' } = req.body;

    if (!email || !password || !name || !phone) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({
        $or: [{ email }, { name }]
    });

    if (existingUser) {
        throw new ApiError(409, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
        throw new ApiError(500, "Error hashing password");
    }

    const userData = {
        name,
        phone,
        email,
        password: hashedPassword,
        type
    };

    if (type === 'owner') {
        userData.myPg = [];
    } else {
        userData.bookmarks = [];
    }
    const newUser = await User.create(userData);
    const safeUser = newUser.toObject();
    delete safeUser.password;

    return res
        .status(201)
        .json(new ApiResponse(201, safeUser, "User registered successfully"));
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const safeUser = user.toObject();
    delete safeUser.password;

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(200, safeUser, "Login successful"));
});

// Refresh Access Token
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingToken = req.cookies?.refreshToken;
    if (!incomingToken) {
        throw new ApiError(401, "Refresh token is missing");
    }

    const user = await User.findOne({ refreshToken: incomingToken });
    if (!user) {
        throw new ApiError(403, "Invalid refresh token");
    }

    const isTokenValid = user.isRefreshTokenValid(incomingToken);
    if (!isTokenValid) {
        throw new ApiError(403, "Refresh token is invalid or expired");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(200, { accessToken, refreshToken }, "Access token refreshed"));
});

// Logout User
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $unset: { refreshToken: 1 }
    });

    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

// Update Password
const updatePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");
    if (!user) throw new ApiError(401, "Unauthorized");

    const isMatch = await user.isPasswordCorrect(oldPassword);
    if (!isMatch) throw new ApiError(401, "Incorrect old password");

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password updated successfully"));
});

// Get Current User
const getCurrentUser = asyncHandler(async (req, res) => {

    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "User profile fetched"));
});

// Update Account Info
const updateAccountName = asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name) {
        throw new ApiError(400, "Please enter a name");
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { name },
        { new: true }
    ).select("-password");

    return res
        .status(200)
        .json(new ApiResponse(200, updatedUser, "User name updated"));
});


const updateAccountEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Please enter a email");
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { email },
        { new: true }
    ).select("-password");

    return res
        .status(200)
        .json(new ApiResponse(200, updatedUser, "User info updated"));
});

const updateAccountPhone = asyncHandler(async (req, res) => {
    const {phone} = req.body;

    if (!phone) {
        throw new ApiError(400, "All fields are required");
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { phone },
        { new: true }
    ).select("-password");

    return res
        .status(200)
        .json(new ApiResponse(200, updatedUser, "User info updated"));
});

export {
    registerUser,
    loginUser,
    logoutUser,
    updatePassword,
    getCurrentUser,
    refreshAccessToken,
    updateAccountEmail,
    updateAccountPhone,
    updateAccountName
};