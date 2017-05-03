// console.log('Starting notes.js');
const fs = require('fs');

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    // console.log('Adding Note', title, body);
    var notes = fetchNotes(); 
    var note = {
        title,
        body
    };

    var duplicateNotes = notes.filter( (note) => note.title === title );

    if ( duplicateNotes.length === 0 ){ 
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var getAll = () => {
    return fetchNotes(); 
};

var getNote = (title) => {
    var notes = fetchNotes(); 
    var filteredNotes = notes.filter( (note ) => note.title === title);
    return filteredNotes[0];
};

var removeNote = (title) => {
    var notes = fetchNotes(); 
    var notesToKeep = notes.filter( (note) => note.title != title ); // Keeps all the notes EXCEPT what we want to trash
    saveNotes(notesToKeep); // Return the notes we want to keep to our JSON file

    return notes.length != notesToKeep.length; // if returns true, a note was deleted
};

var logNote = (note) => {
    //debugger;
    console.log('--------');
    console.log(`Note title: ${note.title}`);
    console.log(`Note body: ${note.body}`);
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};