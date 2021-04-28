const fs = require("fs").promises;
const express = require('express');

class Note {
  read() {
    return fs.readFile("db/db.json", "utf-8");
  };

  allNotes() {
    return this.read().then((notes) => {
      const parseNotes = JSON.parse(notes).map((note) => note);
      return parseNotes;
    });
  }

  remove(note) {
    return this.allNotes().then((notes) => {
      let stringNotes = JSON.stringify(notes);
      // loop through object notes
      for (note of notes) {
        // tests if selectedNote is within givenNotes
        let givenNotes = stringNotes.id;
        let selectedNote = x.id;
        // console.log(givenNotes);
        // console.log(selectedNote);
        if (selectedNote == givenNotes) {
          // console.log('gotcha');
          
          fs.writeFile('./db/db.json', stringNotes, (err) => {
            console.log(err);
            console.log('Note has been removed');
          })
          
        }
      }
    })
  };

  add(newNote) {
    return this.allNotes().then((notes) => {
      let entered = JSON.parse(newNote);
      let previousNotes = notes;
      // STEP 1: push new notes to previousNotes collection
      previousNotes.push(entered)
      let stringNotes = JSON.stringify(previousNotes);
      // STEP 2: write entered + previousNotes to db.json file
      fs.writeFile('./db/db.json', stringNotes, (err) => {
        console.log(err);
        console.log('New note has been added')
      })
    })  
  };

};

module.exports = new Note();
