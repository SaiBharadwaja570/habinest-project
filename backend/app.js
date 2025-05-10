import express from 'express'
import cors from 'cors'
import userRouter from './src/routes/user.routes.js' // importing routes from user.routes.js
import listingsRouter from './src/routes/listings.routes.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// express.urlencoded() parses the data and makes it available in the req.body object
app.use(express.urlencoded({extended: true, limit: "16kb"}))


//The express.static() is a built-in middleware function in Express.js that allows you to serve static files (like images, HTML, CSS, and JavaScript) directly to the client.
app.use(express.static("public"))

// to perform crud option on users cookies
app.use(cookieParser())



app.use('/api/user', userRouter)
app.use('/api/pg', listingsRouter) 

export default app;