import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { io } from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, setTasks } from '../components/slice/taskSlice';

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("https://todo-in-react-hizb.onrender.com");
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

  const contextValue = useMemo(() => ({
    tasks,
    fetchTasks: handleFetchTasks,
    updateTasks,
    socket,
    dispatch
  }), [tasks, handleFetchTasks, updateTasks, socket, dispatch]);

  return (
    <BoardContext.Provider value={contextValue}>
      {children}
    </BoardContext.Provider>
  );
};
