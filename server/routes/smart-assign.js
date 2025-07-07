import express from 'express';
import User from '../models/User.js';
import Task from '../models/Task.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Smart assign a task
router.post('/:id/smart-assign', auth, async (req, res) => {
  try {
    const users = await User.find();
    const tasks = await Task.find({ status: { $ne: 'Done' } });

    const userTaskCounts = users.map((user) => ({
      user,
      taskCount: tasks.filter((task) => task.assignedTo && task.assignedTo.equals(user._id)).length,
    }));

    userTaskCounts.sort((a, b) => a.taskCount - b.taskCount);

    const leastBusyUser = userTaskCounts[0].user;

    let task = await Task.findById(req.params.id);
    task.assignedTo = leastBusyUser._id;
    await task.save();

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
