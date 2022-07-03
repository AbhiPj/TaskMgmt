// import asyncHandler from "express-async-handler";
import { TaskComment } from "../models/taskCommentModel.js";

export const addTaskComment = async (req, res) => {
  const { name, comment, taskId } = req.body;

  const taskComment = new TaskComment({
    name,
    comment,
    taskId,
  });

  const addedTaskComment = taskComment.save();

  if (addedTaskComment) {
    res.status(201).json(addedTaskComment);
  } else {
    res.status(400);
    throw new Error("Task Comment not added");
  }
};

export const listTaskComment = async (req, res) => {
  const taskComment = await TaskComment.find({
    taskId: req.params.id,
  });
  if (taskComment) {
    res.status(201).json(taskComment);
  } else {
    res.status(400);
    throw new Error("Task comments not found");
  }
};
