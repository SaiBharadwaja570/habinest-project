import app from './app.js';
import dotenv from 'dotenv';
import userDB from './src/db/userDB.js';
import listingsDB from './src/db/listingsDB.js';

dotenv.config();

await userDB().then(() => console.log("Connected user")).catch(console.error);
await listingsDB().then(() => console.log("Connected listing")).catch(console.error);

// ✅ Export the Express app (this is required by Vercel)
export default app;