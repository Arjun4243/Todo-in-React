import express from "express";
import { getTasks, addTasks } from "../controller/Task.js";

const taskRouter = express.Router();

taskRouter.get("/get", getTasks);
taskRouter.post("/add", addTasks);

export default taskRouter;
