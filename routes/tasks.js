const express = require("express");
const router = express.Router();

let tasks = [];

// Get all tasks
router.get("/", (req, res) => {
  res.status(200).json({ tasks });
});

// Create a new task
router.post("/", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  const newTask = { id: tasks.length + 1, title };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update a task
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const task = tasks.find((t) => t.id == id);

  if (!task) return res.status(404).json({ error: "Task not found" });
  if (!title) return res.status(400).json({ error: "Title is required" });

  task.title = title;
  res.status(200).json(task);
});

// Delete a task
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex((t) => t.id == id);

  if (taskIndex === -1) return res.status(404).json({ error: "Task not found" });

  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

module.exports = router;

