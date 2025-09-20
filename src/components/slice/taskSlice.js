import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { io } from 'socket.io-client';

export const socket = io('https://todo-in-react-hizb.onrender.com');


export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, thunkAPI) => {
  return new Promise((resolve, reject) => {
    socket.emit('task/fetchTasks');
    const timeout = setTimeout(() => {
      reject('Timeout: fetchTasks response not received');
    }, 5000);
    socket.once('fetchTasks', (data) => {
      clearTimeout(timeout);
      if (data.success) {
        resolve(data.tasks);
      } else {
        reject(data.message);
      }
    });
  });
});


export const addTask = createAsyncThunk('tasks/addTask', async (taskData, thunkAPI) => {
  return new Promise((resolve, reject) => {
    socket.emit('task/addTask', taskData);
    const timeout = setTimeout(() => {
      reject('Timeout: addTask response not received');
    }, 5000);
    socket.once('addTask', (data) => {
      clearTimeout(timeout);
      if (data.success) {
        resolve(data.task);
      } else {
        reject(data.message);
      }
    });
  });
});


export const updateTask = createAsyncThunk('tasks/updateTask', async ({ _id, status, userName }, thunkAPI) => {
  return new Promise((resolve, reject) => {
    socket.emit('task/updateTask', { _id, status, userName });
    const timeout = setTimeout(() => {
      reject('Timeout: updateTask response not received');
    }, 5000);
    socket.once('updateTask', (data) => {
      clearTimeout(timeout);
      if (data.success) {
        resolve(data.task);
      } else {
        reject(data.message);
      }
    });
  });
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (_id, thunkAPI) => {
  try {
    const response = await new Promise((resolve, reject) => {
      socket.emit('task/deleteTask', { _id });

      const timeout = setTimeout(() => {
        reject('Timeout: deleteTask response not received');
      }, 5000);

      socket.once('deleteTask', (data) => {
        clearTimeout(timeout);
        if (data.success) {
          resolve(data);
        } else {
          reject(data.message || 'Deletion failed');
        }
      });
    });


    thunkAPI.dispatch(removeTaskLocally(_id));
    return _id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateTaskStatus: (state, action) => {
      const { _id, status } = action.payload;
      const task = state.tasks.find(t => t._id === _id);
      if (task) {
        task.status = status;
      }
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    removeTaskLocally: (state, action) => {
      state.tasks = state.tasks.filter(task => task._id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      });
  }
});

export const { updateTaskStatus, setTasks, removeTaskLocally } = taskSlice.actions;
export default taskSlice.reducer;
