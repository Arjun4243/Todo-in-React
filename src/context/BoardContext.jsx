import React, { createContext, useState, useEffect } from 'react';

import axios from 'axios';

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
 

  const fetchTasks = async () => {
  try {


        const res = await axios.get(`http://localhost:5000/api/task/get`);

   setTasks(res.data.tasks);  } catch (err) {
    console.error('Error fetching tasks:', err);
  }
};


  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <BoardContext.Provider value={{ tasks, fetchTasks }}>
      {children}
    </BoardContext.Provider>
  );
};
