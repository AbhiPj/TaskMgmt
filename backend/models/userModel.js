import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String },
    age: { type: Number },
  },
  {
    timestamp: true,
  }
);

export const User = mongoose.model("User", userSchema);
