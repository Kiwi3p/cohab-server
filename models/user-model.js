const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  googleId: String,
  house: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "House",
  },
  tasks: [
     {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  location: {  // eventually to link to API 
    type: String,
    trim: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
