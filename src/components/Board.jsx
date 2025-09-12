import React, { useContext,useCallback } from 'react';
import { BoardContext } from '../context/BoardContext';
import Column from './Column';
import {
  DragDropContext,
  Droppable,
  Draggable
} from '@hello-pangea/dnd';


function Board() {

    const { tasks, setTasks } = useContext(BoardContext);

  const grouped = {
    toDo: tasks.filter(t => t.status === 'toDo'),
    inProgress: tasks.filter(t => t.status === 'inProgress'),
    done: tasks.filter(t => t.status === 'done')
  };

  const onDragEnd = useCallback((result) => {
  const { source, destination, draggableId } = result;

  if (!destination) return;

  // Clone current tasks
  const updatedTasks = [...tasks];

  // Find the dragged task
  const draggedTaskIndex = updatedTasks.findIndex(task => task._id === draggableId);
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

  // Update state
  setTasks(finalTasks);
}, [tasks, setTasks]);


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
