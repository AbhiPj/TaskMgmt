import express from "express";

import {
  listTask,
  addTask,
  detailTask,
  editTask,
  deleteTask,
  addComment,
} from "../controller/taskController.js";

const router = express.Router();

router.route("/add").post(addTask);
router.route("/list").get(listTask);
router.route("/detail/:id").get(detailTask);
router.route("/comment/:id").post(addComment);
router.route("/edit/:id").put(editTask);
router.route("/delete/:id").put(deleteTask);

export default router;
