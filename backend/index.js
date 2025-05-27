// index.js
import app from "./app.js";
import dotenv from 'dotenv'
import userDB from "./src/db/userDB.js";
import listingsDB from "./src/db/listingsDB.js";
import visitDB from "./src/db/visitDB.js";

dotenv.config();

const connectDBs = async () => {
  await userDB();
  await listingsDB();
  await visitDB();
};

// Export handler for Vercel
export default async function handler(req, res) {
  await connectDBs(); // Ensure DBs are connected before handling request
  console.log("All dbs connected")
  return app(req, res); // Let Express handle it
}