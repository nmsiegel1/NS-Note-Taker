const router = require("express").Router();
const {
  filterByQuery,
  findById,
  createNewNote,
  validateNote,
} = require("../../lib/notes");
const notes = require("../../db/db.json");
const uuid = require("../../helpers/uuid");
const path = require("path");
const fs = require("fs");

router.get("/notes", (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

router.get("/notes/:id", (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.delete("/notes/:id", (req, res) => {
  const deletedNote = findById(req.params.id, notes);
  if (deletedNote) {
    const originalList = notes;
    const newList = originalList.filter((note) => note.id !== req.params.id);
    console.log(newList);

    fs.writeFileSync("./db/db.json", JSON.stringify(newList));
    res.json(newList);
  }
});

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
