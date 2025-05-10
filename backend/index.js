import app from "./app.js";
import dotenv from 'dotenv'
import userDB from "./src/db/userDB.js";
import listingsDB from "./src/db/listingsDB.js";
import ApiError from "./src/utils/ApiError.js";

dotenv.config();

app.on('error', (error) => {
    console.error("Error:", error);
    throw error;
})

const startServer = async () => {

    try {
        await new Promise((resolve, reject) => {
            userDB.on('connection', resolve);
            userDB.on('error', reject);
        })

        await new Promise((resolve, reject) => {
            listingsDB.on('connection', resolve);
            listingsDB.on('error', reject);
        })

        app.listen(process.env.PORT || 3000, () =>{
            console.log(`Server listening on port: ${process.env.PORT}`)
        })


    } catch (error) {
        throw new ApiError(500, "Server Error: ", error);
    }
}

startServer();