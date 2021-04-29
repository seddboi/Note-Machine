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
    req.body.id = createID;
    let enteredNotes = JSON.stringify(req.body);
    
    // this then updates the enteredNotes and applies them to the json
    note.add(enteredNotes)
    .then( (newNotes) => {
        res.json(newNotes)
    })
});

router.delete('/notes/:id', (req, res) => {
    // assign a note to variable by its id from 'update' method
    let selectedNote = req.params.id;

    note.allNotes()
    .then( (gatheredNotes) => {
        // console.log('gatheredNotes', gatheredNotes);

        for ([i, x] of gatheredNotes.entries()) {
            console.log(x);
            if (x.id == selectedNote) {
                // this cuts out the selected option and restrings the rest of the options avaialble
                let appliedCutoff = gatheredNotes.splice(i, 1);
                // console.log(appliedCutoff);

                // console.log('-----------------------------')
                // let updatedNotes = JSON.stringify(appliedCutoff);
                
                note.remove(gatheredNotes)
                .then( (newNotes) => {
                    res.json(newNotes);
                });
                // .then( (gatheredNotes) => {
                //     res.json(gatheredNotes)
                // })
            }
        }
    });
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