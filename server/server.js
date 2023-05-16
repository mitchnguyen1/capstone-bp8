require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed, getAllMovies} = require('./controller.js')


app.use(express.json())
app.use(cors())

// Seed
app.post('/api/seed', seed)
app.get('/api/getAllMovies', getAllMovies)


app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))