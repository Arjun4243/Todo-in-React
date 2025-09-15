import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('http://localhost:5000/api/user/get');
  return response.data.users;
});

// Async thunk for adding a user
export const addUser = createAsyncThunk('users/addUser', async (userData) => {
  const response = await axios.post('http://localhost:5000/api/user/add', userData);
  return response.data.user;
});

// Async thunk for updating a user
export const updateUser = createAsyncThunk('users/updateUser', async ({ _id, ...updates }) => {
  const response = await axios.put(`http://localhost:5000/api/user/update/${_id}`, updates);
  return response.data.user;
});

// Async thunk for deleting a user
export const deleteUser = createAsyncThunk('users/deleteUser', async (_id) => {
  await axios.delete(`http://localhost:5000/api/user/delete/${_id}`);
  return _id;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user._id === action.payload._id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user._id !== action.payload);
      });
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
