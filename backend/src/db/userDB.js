import mongoose from 'mongoose';
import ApiError from '../utils/ApiError.js';
import dotenv from 'dotenv';
dotenv.config();
const userDB =  () => {
    try {
        const userConnection=mongoose.createConnection(process.env.USER_MONGO_URL).asPromise();
        return userConnection;
    } catch (error) {
        throw new ApiError(500, 'userDB Connect Failed!!!', error)
    }
}

export default userDB;