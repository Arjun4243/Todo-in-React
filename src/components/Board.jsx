import React, { useContext } from 'react';
import { BoardContext } from '../context/BoardContext';
import Column from './Column';

function Board() {
  const { tasks } = useContext(BoardContext);

  const grouped = {
    toDo: tasks.filter(t => t.status === 'toDo'),
    inProgress: tasks.filter(t => t.status === 'inProgress'),
    done: tasks.filter(t => t.status === 'done')
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <Column title="To Do" status="toDo" tasks={grouped.toDo} />
        <Column title="In Progress" status="inProgress" tasks={grouped.inProgress} />
        <Column title="Done" status="done" tasks={grouped.done} />
      </div>
    </div>
  );
}

export default Board;
