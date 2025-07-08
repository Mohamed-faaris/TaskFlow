import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import { ChevronUp, ChevronDown } from "lucide-react";

const socket = io("http://localhost:5000", {
  withCredentials: true,
  transports: ["websocket", "polling"],
});

const ActivityLog = () => {
  const [actions, setActions] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const fetchActions = async () => {
      const res = await axios.get("/api/actions");
      setActions(res.data);
    };

    fetchActions();

    socket.on("action_log_updated", () => {
      fetchActions();
    });

    return () => {
      socket.off("action_log_updated");
    };
  }, []);

  return (
    <div className={`activity-log-drawer ${isMinimized ? "minimized" : ""}`}>
      <button
        onClick={() => setIsMinimized(!isMinimized)}
        className="drawer-toggle-btn"
      >
        {isMinimized ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      <div className="activity-log-content">
        <h2>Activity Log</h2>
        <ul>
          {actions.map((action) => (
            <li key={action._id}>
              {action.user ? action.user.username : "A user (default)"}{" "}
              {action.action} at {new Date(action.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActivityLog;
