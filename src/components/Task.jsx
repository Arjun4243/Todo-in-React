import React from 'react';

const Task = ({ task }) => {
  return (
    <div className="card mb-2">
      <div className="card-body p-2">
        <p className="mb-1">{task.task}</p>
        {task.username && (
          <small className="text-muted">Assigned to: {task.username}</small>
        )}
      </div>
    </div>
  );
};

export default Task;
