import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String },
    age: { type: Number },
    department: { type: String },
  },
  {
    timestamp: true,
  }
);

export const User = mongoose.model("User", userSchema);
