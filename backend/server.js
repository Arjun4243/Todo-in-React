import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import userRouter from './Router/User.js';
import taskRouter from './Router/Task.js';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Register REST routes
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

// Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("🟢 A new user connected:", socket.id);

});

// Start everything after DB connects
const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`🚀 Server and Socket.IO running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();
