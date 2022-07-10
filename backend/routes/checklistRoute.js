import express from "express";
import {
  listChecklist,
  addChecklist,
  detailChecklist,
  editChecklist,
} from "../controller/checklistController.js";

const router = express.Router();

router.route("/add").post(addChecklist);
router.route("/list").get(listChecklist);
router.route("/detail/:id").get(detailChecklist);
router.route("edit/:id").put(editChecklist);

export default router;
