import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import userRouter from './Router/User.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const startServer = async () => {
  try {
    await connectDB(); // ✅ Wait for DB connection

    app.use("/api/user", userRouter); // ✅ Register routes after DB is ready

    app.listen(PORT, () => {
      console.log("✅ Server is running on port", PORT);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();
