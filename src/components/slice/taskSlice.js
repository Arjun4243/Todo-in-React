import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get('http://localhost:5000/api/task/get');
  return response.data.tasks;
});

// Async thunk for adding a task
export const addTask = createAsyncThunk('tasks/addTask', async (taskData) => {
  const response = await axios.post('http://localhost:5000/api/task/add', taskData);
  if (!response.data.success) {
    throw new Error(response.data.message);
  }
  return response.data.task;
});

// Async thunk for updating a task (for drag and drop)
export const updateTask = createAsyncThunk('tasks/updateTask', async ({ _id, status, userName }) => {
  const response = await axios.put(`http://localhost:5000/api/task/update/${_id}`, { status, userName });
  return response.data.task;
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
  },
});

export const { updateTaskStatus, setTasks } = taskSlice.actions;
export default taskSlice.reducer;
