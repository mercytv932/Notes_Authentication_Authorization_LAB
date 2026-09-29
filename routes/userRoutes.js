const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

//signToken funcction
function signToken(user) {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2h" },
  );
}
//Create a new user - register
router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);

    //create JWT for this user
    const token = signToken(user);
    res.status(201).json({ token, user }); //send user their JWT and info
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

  //create JWT for this user
  const token = signToken(user);
  res.json({ token, user }); //send user their JWT and info
});

module.exports = router;
