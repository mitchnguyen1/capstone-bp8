require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed, getAllMovies, deleteMovie} = require('./controller.js')


app.use(express.json())
app.use(cors())

// Seed
app.post('/api/seed', seed)
//get all rows from DB
app.get('/api/getAllMovies', getAllMovies)
//delete movie by id
app.delete('/api/deleteMovie/:id',deleteMovie)


app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))