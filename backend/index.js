import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/db';

const app = express();

dotenv.config();
app.use(cors());

connectDB()
.then(() => app.listen(8000, () => console.log("Server is running")))
.catch((e) => console.log("Error: " + e))


