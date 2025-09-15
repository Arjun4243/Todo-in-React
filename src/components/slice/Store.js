import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from './taskSlice';
import boardsReducer from './boardsSlice';
import usersReducer from './usersSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
    reducer:{
        tasks: tasksReducer,
        boards: boardsReducer,
        users: usersReducer,
        ui: uiReducer,
    }
})
