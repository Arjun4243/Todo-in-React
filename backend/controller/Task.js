import { taskModel } from '../model/Task.js';

export const addTasks = async (req, res) => {


    try {
        const newTask = await taskModel.create({
            status: req.body.status,
            task: req.body.task,
            userId: req.body.userId,
            userName: req.body.userName
        });

        await newTask.save();
        res.json({
            success:true,
            message: "Task added successfully",
            task: newTask
        })
    }
    catch (error) {
        console.log(error);
        res.json({ message: "Unable to add Task" ,success:false})
    }
}
export const getTasks = async (req, res) => {
  try {

    const tasks = await taskModel.find({});
    res.json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
