// server.js
import dotenv from 'dotenv';
import app from './app.js';
import userDB from './src/db/userDB.js';
import listingsDB from './src/db/listingsDB.js';
import visitDB from './src/db/visitDB.js';

dotenv.config();

const PORT = process.env.PORT || 8000;

const connectDBs = async () => {
  await userDB();
  await listingsDB();
  await visitDB();
};

const startServer = async () => {
  try {
    await connectDBs();
    console.log("✅ All DBs connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
};

startServer();
