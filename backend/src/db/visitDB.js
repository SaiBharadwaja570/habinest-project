import mongoose from 'mongoose';
import ApiError from '../utils/ApiError.js';
import dotenv from 'dotenv';

dotenv.config();

const visitDB = async () => {
    
    try {
        const visitConnection = await mongoose.createConnection(process.env.VISIT_MONGO_URL).asPromise();
        return visitConnection;
    } 

    catch (error) {
        throw new ApiError(500, 'visitDB Connect Failed!!!', error)
    }
}

export default visitDB;