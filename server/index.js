import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";
import actionRoutes from "./routes/actions.js";
import smartAssignRoutes from "./routes/smart-assign.js";

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

connectDB();

const app = express();
app.use(express.json({ extended: false }));
app.use(cookieParser()); // Add cookie parser middleware

// Configure CORS based on environment
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.CLIENT_URL || "http://localhost:5000" // In production, serve from same origin
      : [
          "http://localhost:5173",
          "http://localhost:3000",
          "http://localhost:5002",
        ], // Development origins
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});
app.set("io", io);

const PORT = process.env.PORT || 5000;

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/actions", actionRoutes);
app.use("/api/tasks", smartAssignRoutes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  // Serve static files from the client dist folder
  app.use(express.static(path.join(__dirname, "../client/dist")));

  console.log("running in production mode");
  console.log(
    "Serving static files from:",
    path.join(__dirname, "../client/dist")
  );

  // Handle React routing, return all requests to React app
  // Use a leading slash wildcard for Express 5 compatibility
  // Handle React routing fallback for Single Page App using regex
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
  });
} else {
  console.log("running in development mode");
  // Development route
  app.get("/", (req, res) => {
    res.send("TaskFlow Server is running in development mode");
  });
}

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
