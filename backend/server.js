
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

const corsOptions = {
  origin: ["https://todo-in-react-frontend.onrender.com", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions)); // CORS must be above routes and other middleware

app.use(express.json());


// Register REST routes
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

// Create HTTP server and attach Socket.IO with CORS config
const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions
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
