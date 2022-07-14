import mongoose from "mongoose";

const checklistTaskSchema = mongoose.Schema(
  {
    type: { type: String }, // task type - case for now
    section: { type: String }, // milestone or any sub grouping
    name: { type: String }, // task title
    description: { type: String }, // task title
    priority: { type: String }, // task priority
    progress: { type: String }, // task progress - not started, in progress, completed
    startDate: { type: Date }, // task title
    dueDate: { type: Date }, //policy cover from
    status: { type: String }, // task status - active, inactive
    department: { type: String },
    // responsible: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // }, // user responsible for the task
    checklistItems: [{ title: { type: String }, completed: { type: Boolean } }],
    schemaVersion: { type: String, default: "1.0" },
  },
  {
    timestamps: true,
  }
);
const checklistSchema = mongoose.Schema({
  entity: { type: mongoose.Schema.Types.ObjectId, ref: "Entity" },
  scope: { type: String },
  name: { type: String, required: true },
  description: { type: String }, //checklist description
  type: { type: String }, // case for now and later others can be added
  sections: [{ type: String }], // milestone or any sub grouping
  status: { type: String }, //active, inactive
  checklistTasks: [checklistTaskSchema],
  schemaVersion: { type: String, default: "1.0" },
});
export const Checklist = mongoose.model("Checklist", checklistSchema);
