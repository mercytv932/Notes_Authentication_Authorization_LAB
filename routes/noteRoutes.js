const express = require("express");
const router = express.Router();
const Note = require("../models/Note.js");

//Get all notes that belong to this logged-in-user
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user._id,
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Failed to return user notes" });
  }
});

//Update note by finding it by its ID.
router.put("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note.user.equals(req.user._id)) {
      const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
      res.json(updatedNote);
    } else {
      res.status(403).json({ message: "You can't update this note" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update note" });
  }
});

// Find the note, if it's the owner requesting, delete, if not, fail.
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note.user.equals(req.user._id)) {
      const deleteNote = await Note.findByIdAndDelete(req.params.id);
      res.json(deleteNote);
    } else {
      res.status(403).json({ message: "You can't delete note" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete note" });
  }
});
