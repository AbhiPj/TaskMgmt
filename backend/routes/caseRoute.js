import express from "express";

import { addCase, detailCase, listCase } from "../controller/caseController.js";

const router = express.Router();

router.route("/add").post(addCase);
router.route("/list").get(listCase);
router.route("/detail/:id").get(detailCase);

export default router;
