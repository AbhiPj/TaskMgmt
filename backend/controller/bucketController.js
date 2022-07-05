import { Bucket } from "../models/bucketModel.js";

export const addBucket = (req, res) => {
  const { name } = req.body;

  const bucket = new Bucket({
    name,
  });

  const addedBucket = bucket.save();

  if (addedBucket) {
    res.status(201).json("bucket added");
  } else {
    res.status(400);
    throw new Error("Bucket cannot be added.");
  }
};

export const listBucket = (req, res) => {
  Bucket.find()
    .then((bucket) => res.status(201).json(bucket))
    .catch((err) => res.status(400).json("Error: " + err));
};
