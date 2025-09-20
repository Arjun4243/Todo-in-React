import userModel from "../model/User.js";


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

        const newUser=new userModel({
            name,
            email,
            password
        })
        await newUser.save();

        res.json({
            success:true,
            message:"user registered successfully",
        })
    }
    catch(error){
        console.error("Error registering user:", error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })        
    }
}




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