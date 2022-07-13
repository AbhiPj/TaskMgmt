import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import taskRoutes from "./routes/taskRoute.js";
import userRoutes from "./routes/userRoutes.js";
import taskCommentRoutes from "./routes/taskComment.js";
import bucketRoute from "./routes/bucketRoute.js";
import checklistRoute from "./routes/checklistRoute.js";
import caseRoute from "./routes/caseRoute.js";

dotenv.config();
connectDB();

const app = express();

app.use("*", cors());

app.use(express.json());

app.use("/task", taskRoutes);
app.use("/user", userRoutes);
app.use("/comment", taskCommentRoutes);
app.use("/bucket", bucketRoute);
app.use("/checklist", checklistRoute);
app.use("/case", caseRoute);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server Running on Port ${PORT} on ${process.env.NODE_ENV}`)
);
