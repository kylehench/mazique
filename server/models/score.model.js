const mongoose = require('mongoose')
const defaultScoreDocument = require('./defaultScoreDocument')

const ScoreSchema = new mongoose.Schema({
  document: {
    type: Object,
    required: [true, "Score is required"],
    default: defaultScoreDocument.defaultScoreDocument(),
  },
}, {timestamps: true})

module.exports = mongoose.model('Score', ScoreSchema)