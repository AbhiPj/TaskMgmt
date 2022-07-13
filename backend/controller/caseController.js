import { Case } from "../models/caseModel.js";

export const addCase = (req, res) => {
  const { name, checklist } = req.body;

  const newCase = new Case({
    name,
    checklist,
  });

  const addedCase = newCase.save();

  if (addedCase) {
    res.status(201).json("case added");
  } else {
    res.status(400);
    throw new Error("case cannot be added. Try again.");
  }
};

export const listCase = (req, res) => {
  Case.find()
    .populate("checklist")

    .then((task) => res.status(201).json(task))
    .catch((err) => res.status(400).json("Error: " + err));
};

export const detailCase = (req, res) => {
  Case.findById(req.params.id)
    .populate("checklist")
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
};
