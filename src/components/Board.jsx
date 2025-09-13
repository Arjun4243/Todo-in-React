import { useContext,useCallback,useEffect } from 'react';
import { BoardContext } from '../context/BoardContext';
import Column from './Column';
import {  DragDropContext,} from '@hello-pangea/dnd';




function Board() {

    const { tasks, setTasks,socket } = useContext(BoardContext);

  const grouped = {
    toDo: tasks.filter(t => t.status === 'toDo'),
    inProgress: tasks.filter(t => t.status === 'inProgress'),
    done: tasks.filter(t => t.status === 'done')
  };

  const onDragEnd = useCallback((result) => {

    console.log(result);
  const { source, destination, draggableId } = result;

  if (!destination) return;

  // Clone current tasks
  const updatedTasks = [...tasks];

  // Find the dragged task
  const draggedTaskIndex = updatedTasks.findIndex(e => e._id === draggableId);
  const draggedTask = updatedTasks[draggedTaskIndex];

  if (!draggedTask) return;

  // Remove from original position
  updatedTasks.splice(draggedTaskIndex, 1);

  // Update status
  draggedTask.status = destination.droppableId;

  // Find all tasks in the destination column
  const destinationTasks = updatedTasks.filter(task => task.status === destination.droppableId);

  // Insert at the correct index
  const before = updatedTasks.filter(task => task.status !== destination.droppableId);

  destinationTasks.splice(destination.index, 0, draggedTask);

  

  // Merge back
  const finalTasks = [...before, ...destinationTasks];
  
  
  const userNameUpdate= localStorage.getItem("userName")


  
socket.emit("updateTask", {
  _id: draggedTask._id,
  status: draggedTask.status,
  userName: userNameUpdate
});

  setTasks(finalTasks);

}, [tasks, setTasks]);

useEffect(() => {
  if (!socket) return;

  socket.on("responseUpdateTask", (e) => {
    if (e.success) {
      alert(e.message);
    }
  });

  return () => {
    socket.off("responseUpdateTask");
  };
}, [socket]);



  return (
    <DragDropContext onDragEnd={onDragEnd}>

      
      <div className="container mt-4">
        <div className="row"> 
          <Column title="To Do" status="toDo" tasks={grouped.toDo} />
          <Column title="In Progress" status="inProgress" tasks={grouped.inProgress} />
          <Column title="Done" status="done" tasks={grouped.done} />
        </div>
      </div>
    </DragDropContext>
  );
}

export default Board;
