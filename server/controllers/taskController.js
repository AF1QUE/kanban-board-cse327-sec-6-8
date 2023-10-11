const Task = require("../models/taskModel");

// Create a new task within a list
exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Could not create task" });
  }
};

// Get all tasks within a list
exports.getAllTasks = async (req, res) => {
  const { listId } = req.params;
  try {
    const tasks = await Task.find({ list: listId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch tasks" });
  }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch the task" });
  }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Could not update the task" });
  }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndRemove(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: "Could not delete the task" });
  }
};