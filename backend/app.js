import express from 'express'
import cors from 'cors'


const app = express()

app.use(express.json())
app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

// importing routes from user.routes.js

import userRouter from './src/routes/user.routes.js'

app.use('/api/user', userRouter)




export default app;