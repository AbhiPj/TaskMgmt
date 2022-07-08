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

export const editBucket = (req, res) => {
  const { name } = req.body.body;
  Bucket.findById(req.params.id)
    .then((bucket) => {
      bucket.name = name || bucket.name;

      bucket
        .save()
        .then(() => res.json("bucket updated"))
        .catch((err) => res.status(400).json("error" + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const deleteBucket = (req, res) => {
  Bucket.findByIdAndDelete(req.params.id)
    .then((bucket) => res.json("Bucket deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
};
