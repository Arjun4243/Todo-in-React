import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const urlDatabase="mongodb+srv://arjunsinghanya35_db_user:LsVwhHdJXW6cmqmj@pen.lpueoko.mongodb.net/blackboard;"

const connectDB=async()=>{
    try{
        await mongoose.connect(urlDatabase);
        console.log("Database connected");
    }
    catch(error){
        console.error("Database connection failed:", error);
    }
}

export default connectDB;