import mongoose from 'mongoose';
import ApiError from '../utils/ApiError.js';
import dotenv from 'dotenv';

const userDB =  () => {
    try {
        console.log(process.env.MONGO_URL);
        const connect = mongoose.connect(process.env.MONGO_URL);

        connect.on('connected', () => {  
            console.log('userDB connected'); 
        }
        );
        connect.on('error', (error) => {  
            console.error('Connection error:', error); 
            throw new ApiError(500, 'userDB Connection Error', error);
        });
        connect.on('disconnected', () => {  
            console.log('userDB disconnected'); 
        }
        );
        return connect;
    } catch (error) {
        throw new ApiError(500, 'userDB Connect Failed!!!', error)
    }
}

export default userDB;