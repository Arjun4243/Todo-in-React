
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import userRouter from './Router/User.js';
import taskRouter from './Router/Task.js';
import http from 'http';
import { Server } from 'socket.io';
import socketHandler from './socket/socketHandler.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


const corsOptions = {
  origin: ["https://todo-in-react-frontend.onrender.com"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
};

app.use(cors(corsOptions));


// Register REST routes
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

// Create HTTP server and attach Socket.IO with CORS config
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (or specify your frontend URL)
    
  }
});

// Handle Socket.IO connections

socketHandler(io)
// Start everything after DB connects
const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(` Server and Socket.IO running on port ${PORT}`);
    });
  } catch (error) {
    console.error(" Failed to start server:", error);
  }
};

startServer();
