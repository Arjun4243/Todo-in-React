import {taskModel} from "../model/Task.js";

export default function socketHandler(io) {
  io.on("connection", (socket) => {
    console.log("A New user Connected", socket.id);

    socket.on("updateTask", async (data) => {
      const { _id, status, userName } = data;

      try {
        const updatedTaskValue = await taskModel.findByIdAndUpdate(
          _id,
          { status, userName },
          { new: true }
        );

        if (!updatedTaskValue) {
          return socket.emit("responseUpdateTask", {
            success: false,
            message: "Task not found",
          });
        }

        socket.emit("responseUpdateTask", {
          success: true,
          message: "Task updated successfully",
          task: updatedTaskValue
        });
      } catch (error) {
        console.error("❌ Update error:", error);
        socket.emit("responseUpdateTask", {
          success: false,
          message: "Updation Failed"
        });
      }
    });

    socket.on("task/fetchTasks", async () => {
      try {
        const tasks = await taskModel.find();
        socket.emit("fetchTasks", { success: true, tasks });
      } catch (error) {
        socket.emit("fetchTasks", { success: false, message: "Failed to fetch tasks" });
      }
    });

    socket.on("task/addTask", async (taskData) => {
      try {
        const newTask = new taskModel(taskData);
        await newTask.save();
        socket.emit("addTask", { success: true, task: newTask });
      } catch (error) {
        socket.emit("addTask", { success: false, message: "Failed to add task" });
      }
    });

    socket.on("task/updateTask", async (data) => {
      const { _id, status, userName } = data;
      try {
        const updatedTask = await taskModel.findByIdAndUpdate(_id, { status, userName }, { new: true });
        if (!updatedTask) {
          socket.emit("updateTask", { success: false, message: "Task not found" });
        } else {
          socket.emit("updateTask", { success: true, task: updatedTask });
        }
      } catch (error) {
        socket.emit("updateTask", { success: false, message: "Failed to update task" });
      }
    });

    socket.on("task/deleteTask",async(data)=>{
      try{
        await taskModel.findByIdAndDelete(data._id)
        socket.emit("deleteTask",{success:true,message:"Deleted"})
      }
      catch(error){
        console.error("Delete error:", error);
        socket.emit("deleteTask",{success:false,message:"Not Deleted"})
      }
    })
  });
}
