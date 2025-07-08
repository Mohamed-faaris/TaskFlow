
import React, { useState } from 'react';
import axios from 'axios';

const AddTask = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      alert('Please add a title');
      return;
    }
    try {
      const res = await axios.post('/api/tasks', { title, description });
      onTaskAdded(res.data);
      setTitle('');
      setDescription('');
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
      <button type="submit" className="btn btn-block">
        Save Task
      </button>
    </form>
  );
};

export default AddTask;
