import mongoose,{Schema} from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    name : {
        type : String,
        required : true,
        max : 30,
        trim : true,
        lowercase : true
    },
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true
    },
    password : {
        type :String,
        required : true,
        min : 4,
        max : 8
    },

    likedMovies : {
        type : Array,
        default : []
    }
},{timestamps:true});


userSchema.pre("save",  async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,12);
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("user",userSchema);