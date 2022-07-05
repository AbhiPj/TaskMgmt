import express from "express";

import { listBucket, addBucket } from "../controller/bucketController.js";

const router = express.Router();

router.route("/add").post(addBucket);
router.route("/list").get(listBucket);

export default router;
