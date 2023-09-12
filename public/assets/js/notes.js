const notes = require('express').Router();
const fs = require('fs');
const util = require('util');
const {v4: uuidv4} = require('uuid');

const readFromFile = util.promisify(fs.readFile);

// in this funtion, json stringify takes three arguments
// content will be written into the file in path
// null will handle any non-jsonable values, so nothing is left behing
// 4 is the number of spaces to indent the note body in the file, so the notes array looks cute
const writeToFile = (path, content) => {
    fs.writeFile(path, JSON.stringify(content, null, 4), (err) => 
    err ? console.log(err) : console.info(`\nData written to ${path}`)
    )
}

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if(err){
            console.log(err)
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    })
}

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


notes.post('/', (req, res) => {
    const {title, text} = req.body;

    if(req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4()
        }

        readAndAppend(newNote, './db/db.json');
        res.json('Note added')
    } else {
        res.error(`Error in adding note`)
    }
})

notes.delete("/")

module.exports = notes;