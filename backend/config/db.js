import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const urlDatabase="mongodb+srv://arjunsinghanya35_db_user:Nt3fUpgmoAKF09mr@pen.lpueoko.mongodb.net/?retryWrites=true&w=majority&appName=pen"

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