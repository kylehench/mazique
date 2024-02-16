const mongoose = require('mongoose')

DBName = 'scores'

// Make `sanitizeFilter` true by default
mongoose.set('sanitizeFilter', true)
//This will create a database named DBName if one doesn't already exist (no need for mongo shell!)
mongoose.connect(`mongodb://localhost/${DBName}`, {
    family: 4
})
    .then(() => console.log(`Established a connection to the database '${DBName}'`))
    .catch(err => console.log('Something went wrong when connecting to the database', err))
