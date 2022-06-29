const fs = require("fs");
const path = require("path");

// filterByQuery funciton - display notes
function filterByQuery(query, notes) {
    let filteredResults = notes;
    if (query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    if (query.text) {
        filteredResults = filteredResults.filter(note => note.text === query.text)
    }
    return filteredResults
};

// findById function - search for one note
function findById(id, notes) {
    const result = notes.filter(note => note.id === id)[0];
    return result;
};

// createNewNote function - write a new note
function createNewNote(body, notes) {
    let note = body;
    notes.push(note);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notes, null, 2)
    );

    return note;
};

// validateNpte functin - make sure all required parts of a note are provided before saving
function validateNote(note) {
    if(!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
};


module.exports = {
    filterByQuery,
    findById,
    createNewNote,
    validateNote,
  };