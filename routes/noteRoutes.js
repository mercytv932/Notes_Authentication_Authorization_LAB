const express = require("express");
const router = express.Router();
const Note = require("../models/Note.js");

//Get all notes that belong to this logged-in-user
router.get("/", (req, res), async () => {
  try {
    const notes = await Note.find({
      user: req.user._id,
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Failed to return user notes" });
  }
});
