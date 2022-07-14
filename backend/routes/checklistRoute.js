import express from "express";
import {
  listChecklist,
  addChecklist,
  detailChecklist,
  editChecklist,
  addChecklistTask,
  generateTask,
} from "../controller/checklistController.js";

const router = express.Router();

router.route("/add").post(addChecklist);
router.route("/list").get(listChecklist);
router.route("/detail/:id").get(detailChecklist);
router.route("/edit/:id").put(editChecklist);
router.route("/addChecklistTask/:id").post(addChecklistTask);
router.route("/generatetask/:id").get(generateTask);

export default router;
