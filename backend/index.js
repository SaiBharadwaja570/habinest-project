// index.js
import app from "./app.js";
import dotenv from 'dotenv'
import userDB from "./src/db/userDB.js";
import listingsDB from "./src/db/listingsDB.js";
import visitDB from "./src/db/visitDB.js";

dotenv.config();

let dbsConnected = false;

const connectDBs = async () => {
  if (!dbsConnected) {
    await userDB();
    await listingsDB();
    await visitDB();
    dbsConnected = true;
    console.log("All dbs connected");
  }
};

// Initialize DBs once when the serverless function starts
connectDBs();

// Export the Express app directly
export default app;