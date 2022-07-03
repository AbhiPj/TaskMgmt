import express from "express";

import {
  listUser,
  addUser,
  detailUser,
  editUser,
  deleteUser,
} from "../controller/userController.js";

const router = express.Router();

router.route("/add").post(addUser);
router.route("/list").get(listUser);
router.route("/detail/:id").get(detailUser);
router.route("/edit/:id").put(editUser);
router.route("/delete/:id").put(deleteUser);

export default router;
