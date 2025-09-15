import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { io } from 'socket.io-client';

export const socket = io('http://localhost:5000');

// 🔄 Async thunk for fetching tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get('http://localhost:5000/api/task/get');
  return response.data.tasks;
});

// ➕ Async thunk for adding a task
export const addTask = createAsyncThunk('tasks/addTask', async (taskData) => {
  const response = await axios.post('http://localhost:5000/api/task/add', taskData);
  if (!response.data.success) {
    throw new Error(response.data.message);
  }
  return response.data.task;
});

// 🔁 Async thunk for updating a task
export const updateTask = createAsyncThunk('tasks/updateTask', async ({ _id, status, userName }) => {
  const response = await axios.put(`http://localhost:5000/api/task/update/${_id}`, { status, userName });
  return response.data.task;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (_id, thunkAPI) => {
  try {
    const response = await new Promise((resolve, reject) => {
      socket.emit('task/deleteTask', { _id });

      socket.on('deleteTask', (data) => {
        if (data.success) {
          resolve(data);
        } else {
          reject(data.message || 'Deletion failed');
        }
      });
    });

    // ✅ Manually dispatch reducer to update state
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
