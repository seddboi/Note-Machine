const express = require('express');
const note = require('../db/note.js');
const router = express.Router();
const fs = require('fs');

// these create the connection to the uuid module and establish a variable from 
// which we can use to create a new UUID to assign to a specific string
const {v4: uuidv4} = require('uuid');
let createID = uuidv4();

router.get('/', (req, res) => {
    note.read().then((notes) => res.json(JSON.parse(notes)));
});

router.get('/notes', (req, res) => {
    note.allNotes().then((notes) => res.json(notes));
});

router.post('/notes', (req, res) => {
    let enteredNotes = JSON.stringify(req.body);
    
    // creates new unique id and sets it equal to the body of the request given, aka the entered notes
    let selectedEnteredNote = req.body.id;
    selectedEnteredNote = createID;

    // this then updates the enteredNotes and applies them to the json
    note.update(enteredNotes)
    .then( (newNotes) => {
        res.json(newNotes)
    })
});

router.delete('/notes/:id', (req, res) => {
    // assign a note to variable by its id from 'update' method
    let selectedNoteID = req.params.id;

    note.allNotes()
    .then( (gatheredNotes) => {
        for (x of gatheredNotes) {
            let iteratedID = x.id;
            if (iteratedID === selectedNoteID) {
                
            }
        }
    })
})

// let collectedNotes = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));

// router.post('/api/notes', (req, res) => {
//     let position;

//     if (collectedNotes.length) {
//         position = Math.max(...(collectedNotes.map(note => note.id)));
//     } else {
//         position = 0;
//     }

//     const id = position + 1;

//     collectedNotes.push({position, ... req.body});

//     res.json(collectedNotes.slice(-1));

// });

// router.delete('api/notes', (req, res) => {
//     let deleteCorrectNote = collectedNotes.find(({id}) => id === JSON.parse(req.params.id));

//     collectedNotes.splice(collectedNotes.indexOf(deleteCorrectNote), 1);
//     console.log('This notes was deleted');
// });

module.exports = router;