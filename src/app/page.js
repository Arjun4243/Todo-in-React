"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


import { useEffect, useState } from 'react';
import Board from '@/components/Board';
import Register from '../components/registration/Register.jsx';
import Nav from './nav.js';
export default function Home() {
  const [board, setBoard] = useState(null);

const [loginShow,setLoginShow]=useState(false)

  useEffect(() => {
    fetch('/api/board')
      .then((res) => res.json())
      .then(setBoard);
  }, []);

  if (!board) return <div>Loading...</div>;

  

  return (
    <div>
      <Nav setShowLogin={setLoginShow} />
      {loginShow ? <Register /> : null}

      <Board board={board} setBoard={setBoard} />

    </div>
  );
}
