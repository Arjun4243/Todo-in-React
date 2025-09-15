import { Draggable } from '@hello-pangea/dnd';
import {useDispatch} from "react-redux"
import { deleteTask } from './slice/taskSlice.js';


function Task({ task, index }) {

  const dispatch = useDispatch();

  return (

    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          className="card mb-2"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}

        >
          <div className="card-body" style={{ background: "#f9e9d2" }}>
           <div className='d-flex justify-content-between'>

              <div>
                <p className="card-text">{task.task}</p>
                <small className="text-muted">By: {task.userName}</small>
              </div>
              <img src="/deleteButton.gif" alt="delete button" onClick={() => dispatch(deleteTask(task._id))} style={{ cursor: 'pointer' }} />
            </div>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>

  );
}

export default Task;
