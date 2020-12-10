const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const houseSchema = new Schema({
  house: String,
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const House = mongoose.model("House", houseSchema);

module.exports = House;
