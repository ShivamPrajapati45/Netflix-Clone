import { app } from "./app.js";
import { connectDB } from "./db.js";
import dotenv from 'dotenv';

dotenv.config({path:"./.env"})

const PORT = process.env.PORT;


connectDB()
    .then(()=>{
        app.listen(PORT || 8000,()=>{
            console.log(`Server is running on Port : ${PORT}`);
        })
    })
    .catch((err)=> console.log("Database Error : ",err))