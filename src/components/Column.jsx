import React, { useState, useContext ,useEffect} from 'react';
import axios from 'axios';
import Task from './Task.jsx';
import { BoardContext } from '../context/BoardContext';
import {Droppable,} from '@hello-pangea/dnd';


const Column = ({ title, status, tasks }) => {
  const [taskText, setTaskText] = useState('');
  const { fetchTasks } = useContext(BoardContext);
  const [userId,setUserId]=useState()
  const [userName,setUserName]=useState()

useEffect(() => {
  const userId = localStorage.getItem('userToken');
  const userName = localStorage.getItem('userName');

  setUserId(userId)
  setUserName(userName)

}, []);


  const addTask = async () => {
    if (!taskText.trim()) return;

    try {
      await axios.post('http://localhost:5000/api/task/add', {
        task: taskText,
        status,
        userId,
        userName
      });
      setTaskText('');
      fetchTasks();
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  return (
    <div className="col-md-4">
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">{title}</h5>
        </div>


        <Droppable
  droppableId={status}
  isDropDisabled={false}
  isCombineEnabled={false}
  ignoreContainerClipping={false} // ✅ Add this line
>
  {(provided, snapshot) => (
    <div
      ref={provided.innerRef}
      {...provided.droppableProps}
      className="task-list"
      style={{
        minHeight: '100px',
        backgroundColor: snapshot.isDraggingOver ? '#f0f8ff' : 'transparent',
        padding: '8px'
      }}
    >
      {tasks.length === 0 ? (
        <p className="text-muted">No tasks</p>
      ) : (
        tasks.map((task, index) => (
          <Task key={task._id} task={task} index={index} />
        ))
      )}
      {provided.placeholder}
    </div>
  )}
</Droppable>




        <div className="card-body">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Enter task"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
          <button className="btn btn-sm btn-success mb-3" onClick={addTask}>
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Column;
