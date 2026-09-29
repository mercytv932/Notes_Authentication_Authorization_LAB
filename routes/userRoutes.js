const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

//Create a new user - register
router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = signToken(user);
    res.status(201).json({ token, user });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Registration failed, please fill it correctly" });
  }
});

//User returning - login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "Can't find this user" });
  }
  const correctPassword = await user.isCorrectPassword(req.body.password);

  if (!correctPassword) {
    return res.status(400).json({ message: "Wrong password!" });
  }

  const token = signToken(user);
  res.json({ token, user });
});

module.exports = router;
