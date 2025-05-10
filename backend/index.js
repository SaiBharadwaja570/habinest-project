import app from "./app.js";
import dotenv from 'dotenv'
import userDB from "./src/db/userDB.js";
import listingsDB from "./src/db/listingsDB.js";

dotenv.config();

app.on('error', (error) => {
    console.error("Error:", error);
    throw error;
})

