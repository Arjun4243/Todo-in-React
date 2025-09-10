import mongoose from "mongoose"

const useSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true,
        unique:true,    
    },

    password:{
        type:String,
        required:true,
    }
},{timestamps:true})

const userModel = mongoose.model("User",useSchema)
export default userModel;