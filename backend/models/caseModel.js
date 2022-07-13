import mongoose from "mongoose";

const caseSchema = mongoose.Schema({
  name: { type: String },
  checklist: { type: mongoose.Schema.Types.ObjectId, ref: "Checklist" },
});

export const Case = mongoose.model("Case", caseSchema);
