import { Checklist } from "../models/checklistModel.js";
import { Task } from "../models/taskModel.js";
import asyncHandler from "express-async-handler";

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
  const { name, description } = req.body.body;

  Checklist.findById(req.params.id)
    .then((checklist) => {
      checklist.name = name || checklist.name;
      checklist.description = description || checklist.description;
      checklist
        .save()
        .then(() => res.json("checklist task added"))
        .catch((err) => res.status(400).json("error" + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const addChecklistTask = (req, res) => {
  const { checklistTasks } = req.body;

  const checklist = Checklist.findById(req.params.id);

  var checklistArr = checklist.checklistTasks;

  Checklist.findById(req.params.id)
    .then((checklist) => {
      checklist.checklistTasks.push(checklistTasks);
      checklist
        .save()
        .then(() => res.json("checklist task added"))
        .catch((err) => res.status(400).json("error" + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const editChecklistTask = (req, res) => {
  const { checklistTasks } = req.body;

  const checklist = Checklist.findById(req.params.id);

  var checklistArr = checklist.checklistTasks;

  Checklist.findById(req.params.id)
    .then((checklist) => {
      checklist.checklistTasks.push(checklistTasks);
      checklist
        .save()
        .then(() => res.json("checklist task added"))
        .catch((err) => res.status(400).json("error" + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const generateTask = asyncHandler(async (req, res) => {
  const checklist = await Checklist.findById(req.params.id);

  if (checklist) {
    checklist.checklistTasks.map((item) => {
      const task = new Task({
        name: item.name,
        description: item.description,
        sourceInfo: req.params.id,
        sourceModel: "Checklist",
      });
      const addedTask = task.save();
    });
    res.status(201).json("Checklist Created");
  } else {
    res.status(400);
    throw new Error("Checklist  Not Found. Try again.");
  }
});
