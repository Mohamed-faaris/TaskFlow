import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import KanbanBoard from "./components/KanbanBoard";
import Login from "./components/Login";
import Register from "./components/Register";
import ActivityLog from "./components/ActivityLog";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<KanbanBoard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <ActivityLog />
      </div>
    </Router>
  );
}

export default App;
