"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect, useState } from 'react';
import Board from '@/components/Board';
import Register from '../components/registration/Register.jsx';
import Nav from './nav.js';
import { ToastContainer,Slide } from 'react-toastify';
import { BoardProvider } from '../context/BoardContext.jsx';

export default function Home() {
  const [board, setBoard] = useState(null);

  const [loginShow, setLoginShow] = useState(false)

  return (
    <div style={{backgroundColor:"#d9d9d9",height:"100vh"}}>
      <BoardProvider>
        <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" transition={Slide} />
        <Nav setShowLogin={setLoginShow} />
        {loginShow ? <Register /> : <Board  board={board} setBoard={setBoard} />}
      </BoardProvider>
    </div>
  );
}
