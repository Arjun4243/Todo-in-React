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
