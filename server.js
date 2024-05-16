const express = require('express')
const router = require('express').Router()
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const app = express()
const PORT = 3001

const { readNotesDB, writeNotesDB } = require('./utils/write-file')

// include assets (middleware)
app.use( express.static('public') )
app.use( express.json() )

app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/notes',(req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('/api/notes', async (req, res) => {
    const notes = await readNotesDB()
    res.json(notes)
})


app.post('/api/notes', async (req, res) => {
    const newNote = {
        id: uuidv4(), 
        ...req.body 
    }
    
    const notes = await readNotesDB()
    
    notes.push(newNote)
    
    await writeNotesDB(notes)
    
    res.status(201).json(newNote)
    
})

// delete note
app.delete("/api/notes/:id", async (req, res) => {
    const id = req.params.id
    const notes = await readNotesDB()

    const filteredNotes = notes
        .filter(notes => notes.id !== id)

    await writeNotesDB(filteredNotes)

    res.status(200).send('Successfully deleted')
})


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);