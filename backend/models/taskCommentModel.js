import mongoose from "mongoose";

const taskCommentSchema = mongoose.Schema(
  {
    name: { type: String },
    comment: { type: String },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Task",
    },
  },
  {
    timestamps: true,
  }
);

export const TaskComment = mongoose.model("TaskComment", taskCommentSchema);
