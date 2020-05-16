const chalk = require('chalk');

const yargs = require('yargs');
const notes = require('./notes');


yargs.command({
    command: "add",
    describe: "Adding a new note!",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string",
        },
        body: {
            describe: "note body",
            demandOption: true,
            type: "string",
        },
    },
    handler: (argv) => {
        let title = argv.title;
        let body = argv.body;
        notes.addNote(title, body);
    },
});

yargs.command({
    command: "remove",
    describe: "Removing a note!",
    builder: {
        title: {
            describe: "note title",
            demandOption: true,
            type: "string",
        },
    },
    handler: (argv) => {
        let title = argv.title;
        notes.deleteNote(title);
    },
});

yargs.command({
    command: "list",
    describe: "Listing all notes!",

    handler: () => {
        notes.listNotes();
    },
});

yargs.command({
    command: "read",
    describe: "reading a note!",
    builder: {
        title: {
            describe: "Read note",
            demandOption: true,
            type: "string",
        },
    },
    handler: (argv) => {
        let title = argv.title;
        notes.readNote(title);
    },
});

yargs.parse();