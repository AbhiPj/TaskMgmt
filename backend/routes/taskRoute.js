import express from "express";

import {
  listTask,
  addTask,
  detailTask,
  editTask,
  deleteTask,
} from "../controller/taskController.js";

const router = express.Router();

router.route("/add").post(addTask);
router.route("/list").get(listTask);
router.route("/detail/:id").get(detailTask);
router.route("/edit/:id").put(editTask);
router.route("/delete/:id").put(deleteTask);

export default router;
