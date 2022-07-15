import asyncHandler from "express-async-handler";
import { Checklist } from "../models/checklistModel.js";
import { Task } from "../models/taskModel.js";

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
        .then(() => res.json("checklist task edited "))
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

export const editChecklistTask = asyncHandler(async (req, res) => {
  const { checklistTask, id } = req.body.task;

  const checklist = await Checklist.findById(req.params.id);

  if (checklist) {
    // console.log(checklist.checklistTasks);
    checklist?.checklistTasks.map((item, index) => {
      if (item._id.toString() == id) {
        checklist.checklistTasks[index].name =
          checklistTask.name || checklist.checklistTasks[index].name;

        checklist.checklistTasks[index].description =
          checklistTask.description ||
          checklist.checklistTasks[index].description;

        checklist.checklistTasks[index].priority =
          checklistTask.priority || checklist.checklistTasks[index].priority;

        checklist.checklistTasks[index].assignedTo =
          checklistTask.assignedTo ||
          checklist.checklistTasks[index].assignedTo;

        checklist.checklistTasks[index].progress =
          checklistTask.progress || checklist.checklistTasks[index].progress;

        checklist.checklistTasks[index].department =
          checklistTask.department ||
          checklist.checklistTasks[index].department;

        const checklistSave = checklist.save();
        res.json(checklistSave);
      }
    });
  } else {
    res.status(404);
    throw new Error("checklist not found");
  }
});

export const detailChecklistTask = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const checklist = await Checklist.findById(req.params.id);

  if (checklist) {
    checklist?.checklistTasks.map((item, index) => {
      if (item._id == id) {
        res.json(checklist.checklistTasks[index]);
      } else {
        res.json("error ");
      }
    });
  } else {
    res.status(404);
    throw new Error("checklist not found");
  }
});

export const generateTask = asyncHandler(async (req, res) => {
  const checklist = await Checklist.findById(req.params.id);

  if (checklist) {
    // console.log(checklist);

    checklist?.checklistTasks.map((item) => {
      const task = new Task({
        name: item.name,
        priority: item.priority,
        progress: item.progress,
        department: item.department,
        startDate: item.startDate,
        dueDate: item.dueDate,
        description: item.description,
        sourceInfo: req.params.id,
        sourceModel: "Checklist",
      });
      const addedTask = task.save();
    });
    res.status(201).json("Checklist Created");
  } else {
    res.status(400);
    throw new Error("Checklist generation failed.");
  }
});
