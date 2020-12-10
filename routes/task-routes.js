const { response } = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Task = require("../models/task-model");
const User = require("../models/user-model");

//Route to retrieve all projects
router.get("/tasks", (req, res) => {
  console.log("loggeduser", req.user);
  Task.find().then((allTasksfromDB) => {
    // res.render('projects', allProjectsFromDB)
    res.json(allTasksfromDB);
  });
});

//Push new user to task
/*
router.put("/associatetasks", (req, res) => {
  const taskId = req.body.taskId;
  const userId = req.body.userId;

  console.log("taskid", taskId);
  console.log("userid", userId);

  Task.findByIdAndUpdate(taskId, { $push: { users: userId } }).then(() => {
    User.findByIdAndUpdate(userId, { task: taskId }).then(() => {
      res.json({
        message: `task with ${req.params.taskId} was updated successfully adding user ${req.params.userId}`,
      });
    });
  });
});*/

//Route to add a new project
router.post("/tasks", (req, res) => {
  const { task, user, done, date } = req.body;
  console.log("task", task);
  console.log("user", user);
  console.log("done", done);
  Task.create({
    task,
    user,
    done,
    date,
  }).then((response) => {
    User.findByIdAndUpdate(user, { $push: { tasks: response._id } }).then(
      () => {
        res.json(response);
      }
    );
  });
});

//Route to find house by id
router.get("/tasks/:id", (req, res) => {
  Task.findById(req.params.id).then((theTaskFromDB) => {
    res.json(theTaskFromDB);
  });
});

//Route to update a project
router.put("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const taskDone = !req.body.done;

  Task.findByIdAndUpdate(taskId, { done: taskDone }, { new: true }).then(
    (task) => {
      res.json({
        message: `Task with ${task._id} was updated successfully`,
      });
    }
  );
});

//delete route
router.delete("/tasks/:id", (req, res) => {
  Task.findByIdAndRemove(req.params.id).then(() => {
    res.json({ message: `Task with ${req.params.id} was deleted` });
  });
});

router.get("/task-users", (req, res) => {
  const user = req.user;
  const userId = user._id;
  User.findById(userId)
    .populate("tasks")
    .then((foundTasks) => {
      console.log("tasks in da user", foundTasks);
      res.json(foundTasks);
    });
});

module.exports = router;
