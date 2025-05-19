import express from 'express'
import cors from 'cors'
import userRouter from './src/routes/user.routes.js' // importing routes from user.routes.js
import listingsRouter from './src/routes/listings.routes.js'
import cookieParser from 'cookie-parser'
import bookmarkRouter from './src/routes/bookmark.routes.js'


const app = express()

app.use(express.json())

const allowedOrigins = ['http://localhost:5173']; // add your frontend URL(s) here

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin like Postman or server-to-server
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // important to allow cookies/auth
}));


// express.urlencoded() parses the data and makes it available in the req.body object
app.use(express.urlencoded({extended: true, limit: "16kb"}))


//The express.static() is a built-in middleware function in Express.js that allows you to serve static files (like images, HTML, CSS, and JavaScript) directly to the client.
app.use(express.static("public"))

// to perform crud option on users cookies
app.use(cookieParser())


// for-user
app.use('/api/user', userRouter)

// for-pg
app.use('/api/pg', listingsRouter) 

//for-bookmarks
app.use('/api/bookmarks', bookmarkRouter);

export default app;