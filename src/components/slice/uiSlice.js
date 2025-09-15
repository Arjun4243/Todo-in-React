import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    filters: {
      status: 'all', 
      assignee: 'all',
    },
    searchTerm: '',
    sidebarOpen: false,
  },
  reducers: {
    setFilter: (state, action) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
  },
});

export const { setFilter, setSearchTerm, toggleSidebar, setSidebarOpen } = uiSlice.actions;
export default uiSlice.reducer;
