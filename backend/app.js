import express from 'express'
import cors from 'cors'
import userRouter from './src/routes/user.routes.js' // importing routes from user.routes.js
import pgRouter from './src/routes/listings.routes.js'
import cookieParser from 'cookie-parser'


const app = express()

app.use(express.json())

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// To solve url issues:
app.use(express.urlencoded({extended: true, limit: "16kb"}))

//public assets -- to sore in my server
app.use(express.static("public"))

// to perform crud option on users cookies
app.use(cookieParser())



app.use('/api/user', userRouter)
app.use('/api/pg', pgRouter) 

export default app;