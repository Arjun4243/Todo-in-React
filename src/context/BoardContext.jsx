import React, { createContext, useState, useEffect } from 'react';
import { io } from "socket.io-client";
import axios from 'axios';

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [socket, setSocket] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/task/get`);
      setTasks(res.data.tasks);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <BoardContext.Provider value={{ tasks, fetchTasks, setTasks, socket }}>
      {children}
    </BoardContext.Provider>
  );
};
