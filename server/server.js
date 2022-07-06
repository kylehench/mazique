require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('./config/mongoose.config')

const app = express()

// cookies in express
app.use(cookieParser());
// Change the app.use(cors()) to the one below
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))   // This allows JSON Objects with strings and arrays

require('./routes/user.routes')(app)
const port = 8000
app.listen(port, () => console.log(`Listening on port: ${port}`))