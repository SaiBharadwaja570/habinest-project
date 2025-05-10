import mongoose from 'mongoose';
import ApiError from '../utils/ApiError.js';

const userDB =  () => {
    try {
        const connect = mongoose.createConnection(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

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