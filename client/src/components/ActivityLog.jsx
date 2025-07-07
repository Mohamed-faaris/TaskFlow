import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const ActivityLog = () => {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    const fetchActions = async () => {
      const res = await axios.get('/api/actions');
      setActions(res.data);
    };

    fetchActions();

    socket.on('action_log_updated', () => {
      fetchActions();
    });

    return () => {
      socket.off('action_log_updated');
    };
  }, []);

  return (
    <div className="activity-log">
      <h2>Activity Log</h2>
      <ul>
        {actions.map((action) => (
          <li key={action._id}>
            {action.user.username} {action.action} at {new Date(action.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;
