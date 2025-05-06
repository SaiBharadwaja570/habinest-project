import express from 'express'
import cors from 'cors'
import userRouter from './src/routes/user.routes'

const app = express()

app.use(express.json())
app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

app.use('/api/users', userRouter);



export default app;