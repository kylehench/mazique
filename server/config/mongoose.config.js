const mongoose = require('mongoose');

DBName = 'authentication'

//This will create a database named DBName if one doesn't already exist (no need for mongo shell!)
mongoose.connect(`mongodb://localhost/${DBName}`, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})
    .then(() => console.log(`Established a connection to the database '${DBName}'`))
    .catch(err => console.log('Something went wrong when connecting to the database', err));