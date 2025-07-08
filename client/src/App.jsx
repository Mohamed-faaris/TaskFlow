import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import KanbanBoard from "./components/KanbanBoard";
import Login from "./components/Login";
import Register from "./components/Register";
import ActivityLog from "./components/ActivityLog";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
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
