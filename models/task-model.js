const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  task: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  done: false,
  date: Date,
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
