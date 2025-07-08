import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";
import actionRoutes from "./routes/actions.js";
import smartAssignRoutes from "./routes/smart-assign.js";

dotenv.config();

connectDB();

const app = express();
app.use(express.json({ extended: false }));

// Simple CORS configuration that allows all origins during development
app.use(cors({
  origin: true,
  credentials: true
}));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true
  },
});
app.set("io", io);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/actions", actionRoutes);
app.use("/api/tasks", smartAssignRoutes);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("task_update", () => {
    io.emit("task_updated");
  });

  socket.on("action_log_update", () => {
    io.emit("action_log_updated");
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
