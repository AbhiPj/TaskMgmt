import mongoose from "mongoose";

const bucketSchema = mongoose.Schema(
  {
    name: { type: String },
  },
  {
    timestamp: true,
  }
);

export const Bucket = mongoose.model("Bucket", bucketSchema);
