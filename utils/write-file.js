const { readFile, writeFile } = require('fs/promises')
const path = require('path')

const dbpath = path.join(__dirname,'..', 'db', 'db.json')

const readNotesDB = async () => {
    const notesContent = await readFile(dbpath, 'utf-8')
    const notes = JSON.parse(notesContent)

    return notes
}

const writeNotesDB = async (notes) => {
    return await writeFile(dbpath, JSON.stringify(notes))
}

module.exports = { readNotesDB, writeNotesDB }