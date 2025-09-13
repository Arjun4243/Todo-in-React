"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect, useState } from 'react';
import Board from '@/components/Board';
import Register from '../components/registration/Register.jsx';
import Nav from './nav.js';

import { BoardProvider } from '../context/BoardContext.jsx';

export default function Home() {
  const [board, setBoard] = useState(null);

const [loginShow,setLoginShow]=useState(false)

 

  if (!board) return <div>Loading...</div>;

  

  return (
    <div>
      <BoardProvider>
        <Nav setShowLogin={setLoginShow} />
        {loginShow ? <Register /> : <Board board={board} setBoard={setBoard} />}
      </BoardProvider>
    </div>
  );
}
