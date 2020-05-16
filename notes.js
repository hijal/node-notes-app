const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
    return "all notes";
};

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateTitle = notes.find((note) => note.title === title);

    if (!duplicateTitle) {
        notes.push({
            title: title,
            body: body,
        });
        saveNotes(notes);
        console.log(chalk.bgGreen.inverse("New note added!"));
    } else {
        console.log(chalk.bgRed.inverse("Title already taken!"));
    }
};

const saveNotes = (notes) => {
    const jsonData = JSON.stringify(notes);
    fs.writeFileSync("notes.json", jsonData);
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("notes.json");
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch (err) {
        return [];
    }
};

const deleteNote = (title) => {
    const notes = loadNotes();
    const updatedNotes = notes.filter((note) => note.title !== title);

    if (notes.length > updatedNotes.length) {
        saveNotes(updatedNotes);
        console.log(chalk.bgGreen.inverse("Notes removed!"));
    } else {
        console.log(chalk.bgRed.inverse("No notes found!"));
    }
};

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.bgBlue.white("Your notes\n"));

    notes.filter((note) => {
        console.log(note.title);
        console.log(note.body);
        console.log("--------------");
    });
};

const readNote = (title) => {
    const notes = loadNotes();
    const readNote = notes.find((note) => note.title === title);
    if (readNote) {
        console.log(chalk.bgGreenBright.white(readNote.title));
        console.log(readNote.body);
    } else {
        console.log(chalk.bgRed.inverse("No notes found!"));
    }
};

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    deleteNote: deleteNote,
    listNotes: listNotes,
    readNote: readNote,
};