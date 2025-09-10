import Task from './Task';
import { useState } from 'react';

export default function Column({ column, setBoard, board }) {
  const [newTask, setNewTask] = useState('');

  const handleAdd = async () => {
    if (!newTask) return;
    await fetch('/api/board', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        columnId: column.id,
        task: { title: newTask, assignedTo: null },
      }),
    });
    setNewTask('');
    // NOTE: Not refetching board, so UI won't update until reload!
  };

  return (
    <div
      style={{
        minWidth: 250,
        border: '1px solid #aaa',
        borderRadius: 8,
        padding: 8,
      }}
    >
      <h2>{column.title}</h2>
      <div>
        {column.tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New task"
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
