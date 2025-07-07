import express from 'express';
import auth from '../middleware/auth.js';
import Task from '../models/Task.js';
import Action from '../models/Action.js';

const router = express.Router();

// Get all tasks
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo', 'username');
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create a task
router.post('/', auth, async (req, res) => {
  const { title, description, assignedTo, status, priority } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      assignedTo,
      status,
      priority,
    });

    const task = await newTask.save();

    const action = new Action({
      user: req.user.id,
      action: `created task "${title}"`,
    });
    await action.save();

    req.app.get('io').emit('action_log_updated');

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update a task
router.put('/:id', auth, async (req, res) => {
  const { title, description, assignedTo, status, priority, version } = req.body;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    if (task.version !== version) {
      return res.status(409).json({ msg: 'Conflict: Task has been updated by another user.' });
    }

    task.title = title;
    task.description = description;
    task.assignedTo = assignedTo;
    task.status = status;
    task.priority = priority;
    task.version += 1;

    await task.save();

    const action = new Action({
      user: req.user.id,
      action: `updated task "${title}"`,
    });
    await action.save();

    req.app.get('io').emit('action_log_updated');

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a task
router.delete('/:id', auth, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    await task.remove();

    const action = new Action({
      user: req.user.id,
      action: `deleted task "${task.title}"`,
    });
    await action.save();

    req.app.get('io').emit('action_log_updated');

    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
