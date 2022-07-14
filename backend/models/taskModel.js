import mongoose from "mongoose";

// const commentSchema = mongoose.Schema(
//   {
//     name: { type: String },
//     comment: { type: String },
//   },
//   {
//     timestamps: true,
//   }
// );

const taskSchema = mongoose.Schema(
  {
    sourceInfo: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "sourceModel",
    },
    sourceModel: {
      type: String,
      enum: ["Checklist", "Bucket", "Unassigned"],
    },
    name: { type: String },
    description: { type: String },
    priority: { type: String },
    progress: { type: String },
    assignedTo: { type: String },
    department: { type: String },
    startDate: { type: Date },
    dueDate: { type: Date },

    // comment: [commentSchema],
  },
  {
    timestamp: true,
  }
);

export const Task = mongoose.model("Task", taskSchema);
