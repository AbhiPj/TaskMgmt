import express from "express";
import {
  listChecklist,
  addChecklist,
  detailChecklist,
  editChecklist,
  addChecklistTask,
} from "../controller/checklistController.js";

const router = express.Router();

router.route("/add").post(addChecklist);
router.route("/list").get(listChecklist);
router.route("/detail/:id").get(detailChecklist);
router.route("/edit/:id").put(editChecklist);
router.route("/addChecklistTask/:id").post(addChecklistTask);

export default router;
