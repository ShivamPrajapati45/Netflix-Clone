import jwt from "jsonwebtoken";
import { User } from "../Models/user-model.js";

const createToken = (user) => {
    try{
        return jwt.sign({
            id : user._id,
            name : user.username,
            email : user.email
        },process.env.SECRET_KEY);

    }catch(error){
        console.log("Token Error : ", error);
    }
};

const verifyToken = async (req,res,next) => {
    const token = await req.cookies?.Token || req.header("Authorization")?.replace("Bearer ","");
    console.log("Token : ",token);
    if(!token) return res.status(401).json({msg : "Invalid Token"});

    try{
        const data = jwt.verify(token,process.env.SECRET_KEY);
        const user = await User.findById(data.id).select("-password");
        req.user = user;
        next();
    }catch(error){
        console.log("Token verification error : ",error);
        return res.status(401).json({ msg: "Invalid Token verification" });
    }
}

export {createToken,verifyToken};