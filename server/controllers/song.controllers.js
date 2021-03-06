const Song = require('../models/song.model')
const Score = require('../models/score.model')

module.exports.createSong = async(request, response) => {
  // check that song name is unique
  try {
    const songs = await Song.find({title: request.body.title})
    if (songs.length!==0) return response.status(400).json( {errors: {title: {message: 'Song title already taken'}}})
    const newScore = await Score.create({})
    request.body.score_id = newScore._id
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
  // check that song title is unique (except for one with same id)
  try {
    const songs = await Song.find({title: request.body.title})
    if (songs.length===1 && songs[0]._id!=request.body._id) return response.status(400).json( {errors: {title: {message: 'Song title already taken'}}})
    const song = await Song.findOneAndUpdate({_id: request.params._id}, request.body, {new: true, runValidators: true})
    response.json(song)
  } catch(err) {
    response.status(400).json(err)
  }
}

module.exports.deleteSong = async(request, response) => {
  // deletes song and foreign score
  try {
    const song = await Song.findOne({_id: request.params._id})
    const deleteScoreResponse = await Score.deleteOne({_id: song.score_id})
    const deleteSongResponse = await Song.deleteOne({_id: song._id})
    response.json(deleteSongResponse)
  } catch(err) {
    response.status(400).json(err)
  }
}