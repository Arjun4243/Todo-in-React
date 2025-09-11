import React from 'react';

const Task = ({ task, index }) => {
  return (
    <div className="card mb-2 border-secondary">
      <div className="card-body p-2">
        <p className="mb-1">
          <strong>{index}. </strong>{task.task}
        </p>
        <small className="text-muted">Write: {task.userName}</small>
      </div>
    </div>
  );
};

export default Task;
