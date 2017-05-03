// console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js'); // All the export variables 
const titleOptions = {
        describe: 'Title of note',
        demand: true,
        alias: 't'
    }
const bodyOptions = {
        describe: 'Body of note',
        demand: true,
        alias: 'b'
    }
const argv = yargs.command('add', 'Add a new note', {
    title: titleOptions ,
    body: bodyOptions,
})
.command('list', 'List all notes')
.command('read', 'Read a note', {
    title: titleOptions,
})
.command('delete', 'Delete a note', {
    title: titleOptions,
})
.help()
.argv;
var command = argv._[0];

//console.log(argv);

if (command === 'add'){

    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('--------');
        console.log('Note created!');
        notes.logNote(note);
        
    } else {
        console.log('--------');
        console.log('Note title taken.');
        console.log('--------');
    }

} 

else if (command === 'list'){
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => notes.logNote(note) );
} 

else if (command === 'read'){
    var note = notes.getNote(argv.title);
    if(note){
        console.log('--------');
        console.log('Note found');
        notes.logNote(note);
    } else {
        console.log('Note not found.');
    }
} 

else if (command === 'delete'){
    var removed = notes.removeNote(argv.title);
    removed ? console.log(`Deleting ${argv.title}`) : console.log('No such note exists. Delete failed.');
}

else {
    console.log('Command not recognized. Options are read, add, delete, list.');
}
