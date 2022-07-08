import express from "express";

import {
  listBucket,
  addBucket,
  editBucket,
  deleteBucket,
} from "../controller/bucketController.js";

const router = express.Router();

router.route("/add").post(addBucket);
router.route("/list").get(listBucket);
router.route("/edit/:id").put(editBucket);
router.route("/delete/:id").put(deleteBucket);

export default router;
