const express = require('express');
const path = require('path');
const { filterByQuery, findById, createNewNote, validateNote } = require('./lib/notes');
const { notes } = require('./Develop/db/db.json')

const app = express();
const PORT = process.env.PORT || 3001;


// middlewear
app.use(express.urlencoded({etended: true}));
app.use(express.json());
app.use(express.static('public'))

// APIs
app.get('/api/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query. results);
    }
    res.json(results);
});

app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

app.post('/api/notes', (req, res) => {
    // req.body.id = //something to make an id
    if (!validateNote(req.body)) {
        res.status(400).send("The note is not properly formatted");
    } else {
        const newNote = createNewNote(req.body, notes);
        res.json(newNote)
    }
})

// HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
})

// listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});