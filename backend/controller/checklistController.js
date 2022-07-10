import { Checklist } from "../models/checklistModel.js";

export const addChecklist = (req, res) => {
  const {
    entity,
    scope,
    name,
    description,
    type,
    sections,
    status,
    checklistTasks,
  } = req.body;

  const checklist = new Checklist({
    entity,
    scope,
    name,
    description,
    type,
    sections,
    status,
    checklistTasks,
  });

  const addedCheckList = checklist.save();

  if (addedCheckList) {
    res.status(201).json("addedCheckList");
  } else {
    res.status(400);
    throw new Error("checklist cannot be added. Try again.");
  }
};

export const listChecklist = (req, res) => {
  Checklist.find()
    .then((checklist) => res.status(201).json(checklist))
    .catch((err) => res.status(400).json("Error: " + err));
};

export const detailChecklist = (req, res) => {
  Checklist.findById(req.params.id)
    .then((task) => res.json(task))
    .catch((err) => res.status(400).json("Error: " + err));
};

export const editChecklist = (req, res) => {
  const {
    // name,
    // description,
    // priority,
    // assignedTo,
    // dateDue,
    // startDate,
    // progress,
    // department,
    // bucket,
    // comment,
  } = req.body.body;

  Checklist.findById(req.params.id)
    .then((checklist) => {
      // task.name = name || task.name;
      // task.description = description || task.description;
      // task.priority = priority || task.priority;
      // task.assignedTo = assignedTo || task.assignedTo;
      // task.dateDue = dateDue || task.dateDue;
      // task.startDate = startDate || task.startDate;
      // task.progress = progress || task.progress;
      // task.department = department || task.department;
      // task.bucket = bucket || task.bucket;

      // task.comment = comment || task.comment;
      checklist
        .save()
        .then(() => res.json("checklist task added"))
        .catch((err) => res.status(400).json("error" + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};
