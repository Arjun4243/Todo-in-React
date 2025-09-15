import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
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

  const handleFetchTasks = useCallback(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const updateTasks = useCallback((newTasks) => {
    dispatch(setTasks(newTasks));
  }, [dispatch]);

  const value = useMemo(() => ({
    tasks,
    fetchTasks: handleFetchTasks,
    updateTasks,
    socket,
    dispatch
  }), [tasks, handleFetchTasks, updateTasks, socket, dispatch]);

  return (
    <BoardContext.Provider value={value}>
      {children}
    </BoardContext.Provider>
  );
};
