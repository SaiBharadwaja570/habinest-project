import mongoose from "mongoose";

const listingsDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/listingsDB`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to listingsDB");
    } catch (error) {
        throw new ApiError(500, "listingsDB Connect Failed!!!", error);
    }
}

export default listingsDB;