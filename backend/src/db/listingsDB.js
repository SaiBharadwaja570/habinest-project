import mongoose from "mongoose";
import ApiError from '../utils/ApiError.js';
import dotenv from 'dotenv';
dotenv.config({
    path: '../../.env'
});
const listingsDB = async () => {
    try {
        const listingConnection= await mongoose.createConnection(process.env.LISTING_MONGO_URL).asPromise();
        return listingConnection;
    } catch (error) {
        throw new ApiError(500, "listingsDB Connect Failed!!!", error);
    }
}

export default listingsDB;