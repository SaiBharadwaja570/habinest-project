import mongoose from "mongoose";

const listingsDB =  () => {
    try {
        const connection =  mongoose.createConnection(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        connection.on("connected", () => {
            console.log("listingsDB connected");
        });
        
        connection.on("error", (error) => {
            console.error("Connection error:", error);
            throw new ApiError(500, "listingsDB Connection Error", error);
        });
        
        connection.on("disconnected", () => {
            console.log("listingsDB disconnected");
        });
        
        console.log("Connected to listingsDB");
        return connection;
    
    } catch (error) {
        throw new ApiError(500, "listingsDB Connect Failed!!!", error);
    }
}

export default listingsDB;