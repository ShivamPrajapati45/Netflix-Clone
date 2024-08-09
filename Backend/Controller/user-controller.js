import { option } from "../constants.js";
import { User } from "../Models/user-model.js";
import { createToken } from "../Utils/jwt.js";
import bcrypt from "bcrypt";

const register = async (req,res) => {
    try{
        const {name,username,email,password} = req.body;
        if(!name || !username || !email || !password){
            return res.status(400).json({msg : "All fields are required"})
        }

        const existEmail = await User.findOne({email:email});
        if(existEmail) return res.status(409).json({msg : "Email already Exits"})

        const existUsername = await User.findOne({username:username});
        if(existUsername) return res.status(409).json({msg : "username is already Taken"})

        const user = await User.create({
            name,
            username,
            email,
            password
        });
        

        return res.status(201).json({msg : "User Created Successfully", user : user});
    }catch(error){
        console.log("Register Error : ",error);
        return res.status(500).json({msg : "Internal Server Error"})
    }
}

const login = async (req,res) => {
    try{
        const {email,password} = req.body;
        if(!email || !password) return res.status(400).json({msg : "All Fields are Required"});

        const user = await User.findOne({
            $or : [{email : email},{username:email}]
        })

        if(!user) return res.status(404).json({msg : "username or email is wrong"});

        const checkPassword = await user.isPasswordCorrect(password);

        if(!checkPassword) return res.status(401).json({msg : "Password not matched"});

        const currentUser = await User.findById(user._id).select("-password ");

        const token = createToken(currentUser);
        
        return res
                .status(201)
                .cookie("Token",token,option)
                .json({msg : "Login Successfully",user : currentUser});

    }catch(error){
        console.log("Login Error : ",error);
        return res.status(500).json({msg : "Internal Server Error"})
    }
}

const logout = async (_,res) => {
    try{
        return res
                .status(201)
                .clearCookie("Token",option)
                .json({msg : "Logout Successfully"})
    }catch(error){
        console.log("Logout Error : ",error);
        return res.status(401).json({msg : "Logout Failed"});
    }
}

const updatePassword = async (req,res) => {
    try{
        const {email,newPassword} = req.body;
        if(!email || !newPassword) return res.status(401).json({msg: "All fields are required"})
        const user = await User.findOne({
            $or : [{username: email},{email: email}]
        });
    
        if(!user) return res.status(404).json({msg : "username or email are wrong"});

        const hashedPassword = await bcrypt.hash(newPassword,12);

        const newUser = await User.findByIdAndUpdate(
            user._id,
            {
                password: hashedPassword
            },
            {new: true}
        )

        await newUser.save();
        return res.status(201).json({msg : "Password Updated Successfully !",newUser})
    }catch(error){
        return res.status(500).json({msg : "Internal Server error"})
    }
}

const addToLikedMovies = async(req,res) => {
    try{
        const {email,data} = req.body;
        const user = await User.findOne({email});

        if(!user) return res.status(404).json({msg : "User nor found"});

        const {likedMovies} = user;
        const movieAlreadyLiked = likedMovies.find(({id}) => (id === data.id));

        if(movieAlreadyLiked) return res.status(409).json({msg : "Movie Already added to the List"});

        await User.findByIdAndUpdate(
            user._id,
            {
                likedMovies: [...user.likedMovies,data],
            },
            {new : true}
        )
        
        return res.status(201).json({msg : "Movie Added Successfully"});

    }catch(error){
        return res.status(500).json({msg : "Error Adding movie"})
    }
}

const getLikedMovies = async (req,res) => {
    try{
        const {email} = req.params;
        const user = await User.findOne({email});
        if(!user) return res.json({msg : "User with given is not found"});

        return res.json({msg : "success", movies :user.likedMovies});
    }catch(error){
        return res.json({msg : "Liked Movies Error"})
    }
}

const removeMovie = async (req,res) => {
    try{
        const {email,movieId} = req.body;
        console.log(email,movieId);
        const user = await User.findOne({email});

        if(!user) return res.status(404).json({msg : "User not found"});

        const {likedMovies} = user;
        const movieIndex = likedMovies.findIndex(({id})=> id === movieId);
        if(movieIndex === -1) return res.status(404).json({msg : "Movie not Found"});

        likedMovies.splice(movieIndex, 1);

        await User.findByIdAndUpdate(
            user._id,
            {
                likedMovies,
            },
            {new: true}
        )

        await user.save();
        return res.status(201).json({msg : "Movie Deleted", movies: likedMovies});

    }catch(error){
        return res.status(500).json({msg: "User with given email is not found"});
    }
}



export { register,login,updatePassword,logout,addToLikedMovies,getLikedMovies,removeMovie };