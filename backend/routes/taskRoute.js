import express from "express";

import {
  listTask,
  addTask,
  detailTask,
  editTask,
  deleteTask,
  addComment,
  listDepartmentTask,
  listBucketTask,
  addTaskComment,
} from "../controller/taskController.js";

const router = express.Router();

router.route("/add").post(addTask);
router.route("/list").get(listTask);
router.route("/detail/:id").get(detailTask);
router.route("/comment/:id").post(addComment);
router.route("/edit/:id").put(editTask);
router.route("/delete/:id").put(deleteTask);
router.route("/list/:department").get(listDepartmentTask);
router.route("/bucketTask/:id").get(listBucketTask);
router.route("/comment/add/:id").post(addTaskComment);

export default router;
