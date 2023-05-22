require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed, getAllMovies, deleteMovie, submitMovie, randomMovie, updateMovie,findById} = require('./controller.js')
 
app.use(express.static(`${__dirname}/../public/`))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.redirect('/html/index.html');
  });
  
// Seed
app.post('/api/seed', seed)
//get all rows from DB
app.get('/api/getAllMovies', getAllMovies)
//delete movie by id
app.delete('/api/deleteMovie/:id',deleteMovie)
//submit a movie
app.post('/api/submitMovie', submitMovie)
//get a random movie
app.get('/api/randomMovie/',randomMovie)
//put to update a movie
app.put('/api/updateMovie', updateMovie)
//find by id
app.get('/api/getByID/:id',findById)

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))