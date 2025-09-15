import React, { createContext, useState, useEffect } from 'react';
import { io } from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, updateTaskStatus, setTasks } from '../components/slice/taskSlice';

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const updateTasks = (newTasks) => {
    dispatch(setTasks(newTasks));
  };

  return (
    <BoardContext.Provider value={{ tasks, fetchTasks: () => dispatch(fetchTasks()), updateTasks, socket, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
};
