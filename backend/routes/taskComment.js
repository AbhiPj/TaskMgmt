import express from "express";

import {
  addTaskComment,
  listTaskComment,
} from "../controller/taskCommentController.js";

const router = express.Router();

router.route("/add").post(addTaskComment);
router.route("/list/:id").get(listTaskComment);

export default router;
