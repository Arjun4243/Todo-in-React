import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching boards
export const fetchBoards = createAsyncThunk('boards/fetchBoards', async () => {
  const response = await axios.get('http://localhost:5000/api/board/get');
  return response.data.boards;
});

// Async thunk for adding a board
export const addBoard = createAsyncThunk('boards/addBoard', async (boardData) => {
  const response = await axios.post('http://localhost:5000/api/board/add', boardData);
  return response.data.board;
});

// Async thunk for updating a board
export const updateBoard = createAsyncThunk('boards/updateBoard', async ({ _id, ...updates }) => {
  const response = await axios.put(`http://localhost:5000/api/board/update/${_id}`, updates);
  return response.data.board;
});

// Async thunk for deleting a board
export const deleteBoard = createAsyncThunk('boards/deleteBoard', async (_id) => {
  await axios.delete(`http://localhost:5000/api/board/delete/${_id}`);
  return _id;
});

const boardsSlice = createSlice({
  name: 'boards',
  initialState: {
    boards: [],
    loading: false,
    error: null,
  },
  reducers: {
    setBoards: (state, action) => {
      state.boards = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = action.payload;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.boards.push(action.payload);
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        const index = state.boards.findIndex(board => board._id === action.payload._id);
        if (index !== -1) {
          state.boards[index] = action.payload;
        }
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.boards = state.boards.filter(board => board._id !== action.payload);
      });
  },
});

export const { setBoards } = boardsSlice.actions;
export default boardsSlice.reducer;
