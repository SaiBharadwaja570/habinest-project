import app from "./app.js";
import dotenv from 'dotenv'
import userDB from "./src/db/userDB.js";
import listingsDB from "./src/db/listingsDB.js";
import ApiError from "./src/utils/ApiError.js";
dotenv.config();

app.on('error', (error) => {
    console.error("Error:", error);
    throw error;
})



await userDB().then(res=>{console.log("Connected user")}).catch(err=>{console.log(err)})

await listingsDB().then(res=>{console.log("Connected listing")}).catch(err=>{console.log(err)})

app.listen(process.env.PORT || 8000, () =>{
    console.log(`Server listening on port: ${process.env.PORT}`)
})


startServer();