import { User } from "../models/userModel.js";

export const addUser = (req, res) => {
  // const { name, age } = req.body;

  // const task = new User({
  //   name,
  //   age,
  // });

  // const addedTask = task.save();

  // if (addedTask) {
  //   res.status(201).json("addedTask");
  // } else {
  //   res.status(400);
  //   throw new Error("Task cannot be added. Try again.");
  // }

  const name = req.body.name;
  const age = req.body.age;

  const newUser = new User({ name, age });

  newUser
    .save()
    .then(() => res.json("User added"))
    .catch((err) => res.status(400).json("Error: " + err));
};

export const listUser = (req, res) => {
  User.find()
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(400).json("Error :" + err));
};

export const detailUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
};

export const editUser = (req, res) => {
  const { name } = req.body;

  User.findById(req.params.id)
    .then((user) => {
      user.name = name || user.name;
      user
        .save()
        .then(() => res.json("user updated"))
        .catch((err) => res.status(400).json("error" + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => res.json("User deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
};
