import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { io } from 'socket.io-client';

// Point to your local backend to match usersSlice
export const socket = io('https://todo-in-react-hizb.onrender.com');

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, thunkAPI) => {
  try {
    const response = await fetch('https://todo-in-react-hizb.onrender.com/api/task/get',{method:"GET"});

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      return thunkAPI.rejectWithValue(`Failed to fetch tasks: ${response.statusText} - ${errorText}`);
    } else {
      const data = await response.json();
      // Assuming the backend directly returns an array of tasks, or an object with a 'tasks' array
      if (Array.isArray(data)) {
        return data; // If the API returns an array directly
      } else if (data && Array.isArray(data.tasks)) {
        return data.tasks; // If the API returns { success: true, tasks: [...] }
      } else {
        // If the response structure is unexpected, reject the thunk
        console.error('Unexpected response format:', data);
        return thunkAPI.rejectWithValue(data.message || 'Unexpected response format from server');
      }
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addTask = createAsyncThunk('tasks/addTask', async (taskData, thunkAPI) => {
  try {
    return await new Promise((resolve, reject) => {
      socket.emit('task/addTask', taskData);
      const timeout = setTimeout(() => {
        socket.off('addTask');
        reject('Timeout: addTask response not received');
      }, 5000);
      socket.once('addTask', (data) => {
        clearTimeout(timeout);
        if (data.success) {
          resolve(data.task);
        } else {
          reject(data.message || `Server Error: ${JSON.stringify(data)}`);
        }
      });
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


export const updateTask = createAsyncThunk('tasks/updateTask', async ({ _id, status, userName }, thunkAPI) => {
  try {
    return await new Promise((resolve, reject) => {
      socket.emit('task/updateTask', { _id, status, userName });
      const timeout = setTimeout(() => {
        socket.off('updateTask');
        reject('Timeout: updateTask response not received');
      }, 5000);
      socket.once('updateTask', (data) => {
        clearTimeout(timeout);
        if (data.success) {
          resolve(data.task);
        } else {
          reject(data.message || `Server Error: ${JSON.stringify(data)}`);
        }
      });
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (_id, thunkAPI) => {
  try {
    const response = await new Promise((resolve, reject) => {
      socket.emit('task/deleteTask', { _id });

      const timeout = setTimeout(() => {
        socket.off('deleteTask');
        reject('Timeout: deleteTask response not received');
      }, 5000);

      socket.once('deleteTask', (data) => {
        clearTimeout(timeout);
        if (data.success) {
          resolve(_id);
        } else {
          reject(data.message || `Server Error: ${JSON.stringify(data)}`);
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
        state.error = action.payload || action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
      });
  }
});

export const { updateTaskStatus, setTasks, removeTaskLocally } = taskSlice.actions;
export default taskSlice.reducer;
