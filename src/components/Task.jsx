import {
  DragDropContext,
  Droppable,
  Draggable
} from '@hello-pangea/dnd';


function Task({ task, index }) {
  return (

    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          className="card mb-2"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
      
        >
          <div className="card-body" style={{background:"#f9e9d2"}}>
            <p className="card-text">{task.task}</p>
            <small className="text-muted">By: {task.userName}</small>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>

  );
}

export default Task;
