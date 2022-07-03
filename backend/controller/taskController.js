import { Task } from "../models/taskModel.js";

export const addTask = (req, res) => {
  const {
    name,
    description,
    priority,
    assignedTo,
    dateDue,
    startDate,
    progress,
    comment,
  } = req.body;

  const task = new Task({
    name,
    description,
    priority,
    assignedTo,
    dateDue,
    startDate,
    progress,
    comment,
  });

  const addedTask = task.save();

  if (addedTask) {
    res.status(201).json("addedTask");
  } else {
    res.status(400);
    throw new Error("Task cannot be added. Try again.");
  }
};

export const listTask = (req, res) => {
  // const taskExists = Task.find();

  // if (taskExists) {
  //   res.status(201).json(taskExists);
  // } else {
  //   res.status(400);
  //   throw new Error("Task List Not Found. Try again.");

  Task.find()
    .then((task) => res.status(201).json(task))
    .catch((err) => res.status(400).json("Error: " + err));
};

export const detailTask = (req, res) => {
  Task.findById(req.params.id)
    .then((task) => res.json(task))
    .catch((err) => res.status(400).json("Error: " + err));
};

export const editTask = (req, res) => {
  const {
    name,
    description,
    priority,
    assignedTo,
    dateDue,
    startDate,
    progress,
    // comment,
  } = req.body.body;

  Task.findById(req.params.id)
    .then((task) => {
      task.name = name || task.name;
      task.description = description || task.description;
      task.priority = priority || task.priority;
      task.assignedTo = assignedTo || task.assignedTo;
      task.dateDue = dateDue || task.dateDue;
      task.startDate = startDate || task.startDate;
      task.progress = progress || task.progress;
      // task.comment = comment || task.comment;
      task
        .save()
        .then(() => res.json("task updated"))
        .catch((err) => res.status(400).json("error" + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const addComment = (req, res) => {
  const { name, comment } = req.body.comment;

  Task.findById(req.params.id).then((task) => {
    task.name = name || task.name;
    task.comment = comment || task.comment;
  });
};

export const deleteTask = (req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then((task) => res.json("Task deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
};
