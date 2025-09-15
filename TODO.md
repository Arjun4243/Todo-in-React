# TODO: Add Delete Task Functionality

## Backend Changes
- [ ] Add DELETE endpoint in backend/Router/Task.js for deleting a task by _id
- [ ] Implement the delete logic in backend/controller/Task.js or UpdatedTask.js

## Frontend Changes
- [ ] In src/components/slice/taskSlice.js:
  - [ ] Import createAsyncThunk if not already
  - [ ] Add deleteTask async thunk: export const deleteTask = createAsyncThunk('tasks/deleteTask', async (_id) => { const response = await axios.delete(`http://localhost:5000/api/task/delete/${_id}`); return _id; });
  - [ ] Add delete case in extraReducers: builder.addCase(deleteTask.fulfilled, (state, action) => { state.tasks = state.tasks.filter(task => task._id !== action.payload); });
- [ ] In src/components/Task.jsx:
  - [ ] Import useDispatch from 'react-redux'
  - [ ] Import deleteTask from '../slice/taskSlice'
  - [ ] Add a delete button with onClick handler that dispatches deleteTask(task._id)
  - [ ] Optionally, add confirmation dialog before deleting

## Testing
- [ ] Test deleting a task from the UI
- [ ] Verify the task is removed from the board
- [ ] Check backend database for task removal
- [ ] Test error handling if delete fails

## Notes
- Ensure the backend delete endpoint returns success or error
- Handle loading states if needed
- Update any related components if necessary
