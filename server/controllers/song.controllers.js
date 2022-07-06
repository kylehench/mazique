const Song = require('../models/song.model')

module.exports.createSong = async(request, response) => {
  // check that song name is unique
  try {
    const songs = await Song.find({name: request.body.name})
    if (songs.length!==0) return response.status(400).json( {errors: {name: {message: 'Song name already taken'}}})
    const song = await Song.create(request.body)
    response.json(song)
  } catch(err) {
    response.status(400).json(err)
  }
}

module.exports.readAllSongs = (request, response) => {
  Song.find()
    .then(songs => response.json(songs))
    .catch(err => response.status(400).json(err))
}

module.exports.readOneSong = (request, response) => {
  Song.findOne({_id: request.params._id})
    .then(song => response.json(song))
    .catch(err => response.status(400).json(err))
}

module.exports.updateSong = async(request, response) => {
  // check that song name is unique (except for one with same id)
  try {
    const songs = await Song.find({name: request.body.name})
    if (songs.length===1 && songs[0]._id!=request.body._id) return response.status(400).json( {errors: {name: {message: 'Song name already taken'}}})
    const song = await Song.findOneAndUpdate({_id: request.params._id}, request.body, {new: true, runValidators: true})
    response.json(song)
  } catch(err) {
    response.status(400).json(err)
  }
}

module.exports.deleteSong = (request, response) => {
  Song.deleteOne({_id: request.params._id})
    .then(deleteConfirmation => response.json(deleteConfirmation))
    .catch(err => response.status(400).json(err))
}