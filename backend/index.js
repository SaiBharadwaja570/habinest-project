import app from "./app";
import dotenv from 'dotenv'
import connectDB from "./src/db";

dotenv.config({
    path: './env'
});

connectDB()
.then(() => {
    app.listen(process.env.PORT || 3000,
        () => { console.log(`Listening at port: ${process.env.PORT}`) }
    )
}) 
.catch((error) => console.log("Error: ", error))