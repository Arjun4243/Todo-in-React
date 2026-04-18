import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';




export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('http://localhost:5000/api/user/get');
  const data = await response.json();
  return data.users;
});


export const addUser = createAsyncThunk('users/addUser', async (userData) => {
  const response = await fetch('http://localhost:5000/api/user/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  const data = await response.json();
  return data.user;
});


export const updateUser = createAsyncThunk('users/updateUser', async ({ _id, ...updates }) => {
  const response = await fetch(`http://localhost:5000/api/user/update/${_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  const data = await response.json();
  return data.user;
});


export const deleteUser = createAsyncThunk('users/deleteUser', async (_id) => {
  await fetch(`http://localhost:5000/api/user/delete/${_id}`, { method: 'DELETE' });
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
