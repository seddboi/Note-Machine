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
      // loop through object
      for (x of notes) {
        let selectedNote = JSON.stringify(x);
        let allNotes = JSON.stringify(notes);
        // tests if selectedNote is within allNotes
        if (allNotes.find(selectedNote)) {
          console.log('gotcha')
        }
      }
    })
  };

  update(newNote) {
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
