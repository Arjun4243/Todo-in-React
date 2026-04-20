import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { socket } from './taskSlice';


export const fetchBoards = createAsyncThunk('boards/fetchBoards', async (_, thunkAPI) => {
  try {
    return await new Promise((resolve, reject) => {
      socket.emit('board/fetchBoards');
      const timeout = setTimeout(() => {
        socket.off('fetchBoards');
        reject('Timeout: fetchBoards response not received');
      }, 5000);
      socket.once('fetchBoards', (data) => {
        clearTimeout(timeout);
        if (data.success) {
          resolve(data.boards);
        } else {
          reject(data.message || 'Failed to fetch boards');
        }
      });
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


export const addBoard = createAsyncThunk('boards/addBoard', async (boardData, thunkAPI) => {
  try {
    return await new Promise((resolve, reject) => {
      socket.emit('board/addBoard', boardData);
      const timeout = setTimeout(() => {
        socket.off('addBoard');
        reject('Timeout: addBoard response not received');
      }, 5000);
      socket.once('addBoard', (data) => {
        clearTimeout(timeout);
        if (data.success) {
          resolve(data.board);
        } else {
          reject(data.message || 'Failed to add board');
        }
      });
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


export const updateBoard = createAsyncThunk('boards/updateBoard', async ({ _id, ...updates }, thunkAPI) => {
  try {
    return await new Promise((resolve, reject) => {
      socket.emit('board/updateBoard', { _id, ...updates });
      const timeout = setTimeout(() => {
        socket.off('updateBoard');
        reject('Timeout: updateBoard response not received');
      }, 5000);
      socket.once('updateBoard', (data) => {
        clearTimeout(timeout);
        if (data.success) {
          resolve(data.board);
        } else {
          reject(data.message || 'Failed to update board');
        }
      });
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


export const deleteBoard = createAsyncThunk('boards/deleteBoard', async (_id, thunkAPI) => {
  try {
    return await new Promise((resolve, reject) => {
      socket.emit('board/deleteBoard', { _id });
      const timeout = setTimeout(() => {
        socket.off('deleteBoard');
        reject('Timeout: deleteBoard response not received');
      }, 5000);
      socket.once('deleteBoard', (data) => {
        clearTimeout(timeout);
        if (data.success) {
          resolve(_id);
        } else {
          reject(data.message || 'Failed to delete board');
        }
      });
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
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
        state.error = action.payload || action.error.message;
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
