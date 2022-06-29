// requires
const router = require("express").Router();
const {
  filterByQuery,
  findById,
  createNewNote,
  validateNote,
} = require("../../lib/notes");
let notes = require("../../db/db.json");
const uuid = require("../../helpers/uuid");
const path = require("path");
const fs = require("fs");

// GET all notes
router.get("/notes", (req, res) => {
  let results = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

// GET one note
router.get("/notes/:id", (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

// DELETE a not
router.delete("/notes/:id", async (req, res) => {
  const deletedNote = findById(req.params.id, notes);
  if (deletedNote) {
    let originalList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    const filteredNote = await originalList.filter(
      (note) => note.id !== req.params.id
    );

    fs.writeFileSync("./db/db.json", JSON.stringify(filteredNote));
    const newList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    return res.json(newList);
  }
});

// POST new notes
router.post("/notes", (req, res) => {
  req.body.id = uuid();
  if (!validateNote(req.body)) {
    res.status(400).send("The note is not properly formatted");
  } else {
    const newNote = createNewNote(req.body, notes);
    res.json(newNote);
  }
});

module.exports = router;
