const mongoose = require('mongoose')

const SongSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  composer: {
    type: String,
    required: false
  },
  tempo: {
    type: Number,
    required: false
  },
  comments: {
    type: String,
    required: false
  }
}, {timestamps: true})

module.exports = mongoose.model('Song', SongSchema)