import mongoose from 'mongoose';

const taskSchema =new mongoose.Schema({
    taskValue:{
        type:String,
        required:true
    },

    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null,
    },

    user_name:{
        type:String,
        default:""
    }
})

const boardSchema=new mongoose.Schema({
    toDo:[taskSchema],
    inProgress:[taskSchema],
    done:[taskSchema]
},{timestamps:true})

const Board =mongoose.model("Board",boardSchema)
export default Board;