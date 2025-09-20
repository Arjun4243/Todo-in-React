import userModel from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser=async(req,res)=>{
    const {name,email,password}=req.body;

    try{

        const existingUser=await userModel.findOne({email})

        if(existingUser){
            return res.json({
                success:false,
                message:"User already exists"
            })
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser=new userModel({
            name,
            email,
            password: hashedPassword
        })
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            process.env.JWT_SECRET || 'your-secret-key',




const userLogin=async(req,res)=>{
    const {email,password}=req.body;

    try{
        const user =await userModel.findOne({email})

        if(!user){
            return res.json({
                success:false,
                message:"user not found. Please register"
            })
        }

        if(user.password!==password){
            return res.json({
                success:false,
                message:"Invalid password"
            })
        }

        res.json({
            success:true,
            message:"Login successful",
            token:user._id,
            user:{name:user.name}

        })
    }
    catch(error){
        console.log("error in login",error)
        res.json({
            success:false,
            message:"login failed"
        })
    }

}
export default {registerUser,userLogin};