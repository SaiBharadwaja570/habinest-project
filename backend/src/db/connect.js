import mongoose from 'mongoose'

// A funtion to mongoose database

const connectDB  = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("✅ MongoDB Connected!");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
    }
}

export default connectDB;