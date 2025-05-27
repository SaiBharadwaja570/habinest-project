import express from 'express'
import cors from 'cors'
import userRouter from './src/routes/user.routes.js' // importing routes from user.routes.js
import listingsRouter from './src/routes/listings.routes.js'
import cookieParser from 'cookie-parser'
import bookmarkRouter from './src/routes/bookmark.routes.js'
import visitRouter from './src/routes/visit.routes.js'


const app = express()

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cors({
  origin: 'https://habinest-project.vercel.app', 
  credentials: true
}));


//The express.static() is a built-in middleware function in Express.js that allows you to serve static files (like images, HTML, CSS, and JavaScript) directly to the client.
app.use(express.static("public"))

// to perform crud option on users cookies


// for-user
app.use('/api/user', userRouter)

// for-pg
app.use('/api/pg', listingsRouter) 

//for-bookmarks
app.use('/api/bookmarks', bookmarkRouter);

app.use('/api/visits', visitRouter);

export default app;
