import React from 'react';
import {useState,useContext} from "react";
import { BoardContext } from '../context/BoardContext.jsx';
import Task from './Task';

const Column = ({ columnKey, tasks }) => {
  const [taskText,setTaskText]=useState("");
  const {addTask}=useContext(BoardContext)

  const handleAddTask=()=>{
    if(!taskText.trim()) return;

    addTask({columKey:columnKey,taskText})
    setTaskText('')
  }
  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">{columnKey}</h5>
      </div>
      <div className="card-body">
        {tasks.map((task, index) => (
          <Task key={index} task={task} />
        ))}
        <div className="mt-3">
          <input type="text" 
          className="form-control mb-2" 
          placeholder="New task"
          onChange={(e) => setTaskText(e.target.value)}
          />
          <button className="btn btn-outline-primary w-100" onClick={handleAddTask}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default Column;
