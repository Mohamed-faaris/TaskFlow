import React, { useState } from "react";
import axios from "axios";

const AddTask = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      alert("Please add a title");
      return;
    }
    try {
      const res = await axios.post("/api/tasks", { 
        title, 
        description,
        priority 
      });
      onTaskAdded(res.data);
      setTitle("");
      setDescription("");
      setPriority("medium");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="add-task-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Add Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Description</label>
        <input
          type="text"
          placeholder="Add Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>
      <button type="submit" className="btn btn-block">
        Save Task
      </button>
    </form>
  );
};

export default AddTask;
