import mongoose from 'mongoose';
import User from './User.js';

const taskSchema = new mongoose.Schema({
    status:{type:String,enum:["toDo", "inProgress", "done"],default:"toDo"},
    task:{type:String,required:true},
    userId:{type:String,required:true},
    userName:{type:String,required:true}

},{timestamps:true})

export const taskModel = mongoose.model("Task",taskSchema);