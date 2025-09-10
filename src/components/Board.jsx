import React, { useContext } from 'react';
import { BoardContext } from '../context/BoardContext.jsx';
import Column from './Column';

const Board = () => {
  const { board } = useContext(BoardContext);

  return (
    <div className="container-fluid bg-light py-4">
      <div className="row">
        {Object.keys(board).map((columnKey) => (
          <div className="col-md-4 mb-3" key={columnKey}>
            <Column columnKey={columnKey} tasks={board[columnKey]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
