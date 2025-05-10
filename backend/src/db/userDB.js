import mongoose from 'mongoose';
import ApiError from '../utils/ApiError.js';

const userDB =  async () => {
    try {
        mongoose.createConnection(`${process.env.MONGO_URI}/userDB`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to userDB'); 
    } catch (error) {
        throw new ApiError(500, 'userDB Connect Failed!!!', error)
    }
}

export default userDB;