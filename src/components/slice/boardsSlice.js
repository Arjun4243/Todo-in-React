import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { socket } from './taskSlice';


export const fetchBoards = createAsyncThunk('boards/fetchBoards', async (_, thunkAPI) => {
  return new Promise((resolve, reject) => {
    socket.emit('board/fetchBoards');
    socket.on('fetchBoards', (data) => {
      if (data.success) {
        resolve(data.boards);
      } else {
        reject(data.message);
      }
    });
  });
});


export const addBoard = createAsyncThunk('boards/addBoard', async (boardData, thunkAPI) => {
  return new Promise((resolve, reject) => {
    socket.emit('board/addBoard', boardData);
    socket.on('addBoard', (data) => {
      if (data.success) {
        resolve(data.board);
      } else {
        reject(data.message);
      }
    });
  });
});


export const updateBoard = createAsyncThunk('boards/updateBoard', async ({ _id, ...updates }, thunkAPI) => {
  return new Promise((resolve, reject) => {
    socket.emit('board/updateBoard', { _id, ...updates });
    socket.on('updateBoard', (data) => {
      if (data.success) {
        resolve(data.board);
      } else {
        reject(data.message);
      }
    });
  });
});


export const deleteBoard = createAsyncThunk('boards/deleteBoard', async (_id, thunkAPI) => {
  return new Promise((resolve, reject) => {
    socket.emit('board/deleteBoard', { _id });
    socket.on('deleteBoard', (data) => {
      if (data.success) {
        resolve(_id);
      } else {
        reject(data.message);
      }
    });
  });
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
