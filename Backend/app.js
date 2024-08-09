import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser'
const app = express();

app.use(express.json());
app.use(cors({
    origin : "http://localhost:3000",
    methods : ["GET","POST","PUT","DELETE"],
    credentials : true
}))
app.use(cookieParser());
app.use(express.urlencoded());

//import router
import userRouter from "./Routes/user-routes.js"

//router declaration
app.use("/users",userRouter);


export {app};