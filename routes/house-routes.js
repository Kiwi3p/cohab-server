const { response } = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const House = require("../models/house-model");
const User = require("../models/user-model");

//Route to retrieve all projects
router.get("/house", (req, res) => {
  console.log("loggeduser", req.user);
  House.find().then((allHousesfromDB) => {
    // res.render('projects', allProjectsFromDB)
    res.json(allHousesfromDB);
  });
});

//Push new user to house
router.put("/associateHouse", (req, res) => {
  const houseId = req.body.houseId;
  const userId = req.body.userId;

  console.log("houseid", houseId);
  console.log("userid", userId);

  House.findByIdAndUpdate(houseId, { $push: { users: userId } }).then(() => {
    User.findByIdAndUpdate(userId, { house: houseId }).then(() => {
      res.json({
        message: `House with ${req.params.houseId} was updated successfully adding user ${req.params.userId}`,
      });
    });
  });
});

//Route to add a new project
router.post("/house", (req, res) => {
  const loggedUserId = req.user._id;
  const users = [loggedUserId];
  const { house } = req.body;
  //const user = req.user
  House.create({
    house,
    users,
  }).then((response) => {
    res.json({ response });
  });
});

//Route to find house by id
router.get("/house/:id", (req, res) => {
  House.findById(req.params.id).then((theHouseFromDB) => {
    res.json(theHouseFromDB);
  });
});

//Route to update a project
router.put("/house/:id", (req, res) => {
  const houseId = req.params.id;
  const houseWithNewDetails = req.body;

  House.findByIdAndUpdate(houseId, houseWithNewDetails).then(() => {
    res.json({
      message: `House with ${req.params.id} was updated successfully`,
    });
  });
});

//delete route
router.delete("/house/:id", (req, res) => {
  House.findByIdAndRemove(req.params.id).then(() => {
    res.json({ message: `House with ${req.params.id} was deleted` });
  });
});

router.get("/house-users", (req, res) => {

  const houseId = req.user.house;
  House.findById(houseId)
    .populate("users")
    .then((foundHouse) => {
      console.log('this is the house we found', foundHouse)
   
      res.json({ users: foundHouse.users });
    });
});

module.exports = router;
