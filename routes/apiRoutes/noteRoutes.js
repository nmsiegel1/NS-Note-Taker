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
  let newList
  if (deletedNote) {
    let originalList = notes;
    newList = originalList.filter((note) => note.id !== req.params.id);
    console.log(newList);

    fs.writeFileSync("./db/db.json", JSON.stringify(newList));

    // let results = notes;
    //   results = filterByQuery(req.query, results);
    // res.json(results);
  }
  console.log(">>", newList)
  return res.json(newList)

});

// router.delete("/notes/:id", (req, res) => {
//   const id = findById(req.params.id, notes);
//   if (id) {
//     const oldNotes = notes;
//     const deletedList = oldNotes.filter((note) => note.id !== req.params.id);
//     console.log(deletedList);

//     fs.writeFileSync(
//       path.join(__dirname, "../../db/db.json"),
//       JSON.stringify(deletedList)
//     );
//     res.json(deletedList);
//   }
// });

// router.delete("api/notes/:id", (req, res) => {
//     const params = findById(req.params.id, notes);

// db.query(params, (err, result) => {
//     if (err) {
//         res.statusMessage(400).json({error: err.message});
//         return;
//     } else {
//         res.json({
//             message: `deleted`,
//             changes: result.affectedRows,
//             id: req.params.id
//         });
//     }

//   });
// });

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
