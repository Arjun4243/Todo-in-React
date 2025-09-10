import express from 'express';
import userController from '../controller/registerUser.js';
const { registerUser, userLogin } = userController;



const userRouter=express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",userLogin)

export default userRouter;  