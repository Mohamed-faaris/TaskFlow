import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import io from "socket.io-client";
import { ChevronUp, ChevronDown, RefreshCw } from "lucide-react";
import { API_URL } from "../config";

const socket = io(API_URL, {
  withCredentials: true,
  transports: ["websocket", "polling"],
});

const ActivityLog = () => {
  const [actions, setActions] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);

  const fetchActions = useCallback(async () => {
    try {
      const res = await axios.get("/api/actions");
      setActions(res.data);
    } catch (err) {
      console.error("Failed to fetch actions:", err);
    }
  }, []);

  useEffect(() => {
    fetchActions();

    socket.on("action_log_updated", () => {
      fetchActions();
    });

    return () => {
      socket.off("action_log_updated");
    };
  }, [fetchActions]);

  return (
    <div className={`activity-log-drawer ${isMinimized ? "minimized" : ""}`}>
      <button
        onClick={() => setIsMinimized(!isMinimized)}
        className="drawer-toggle-btn"
      >
        {isMinimized ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      <div className="activity-log-header">
        <h2>Activity Log</h2>
        <button onClick={fetchActions} className="btn-refresh">
          <RefreshCw size={16} />
        </button>
      </div>
      <div className="activity-log-content">
        <ul>
          {actions.map((action) => (
            <li key={action._id}>
              {action.user
                ? `${action.user.username} (${action.user.email})`
                : "System Action"}{" "}
              {action.action} at {new Date(action.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActivityLog;
