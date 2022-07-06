const userController = require('../controllers/song.controllers')

module.exports = app => {
  // create song
  app.post('/api/songs', SongController.createSong)
  
  // read one song
  app.get('/api/songs/:_id', SongController.readOneSong)
  
  // read all songs
  app.get('/api/songs', SongController.readAllSongs)
  
  // update song
  app.put('/api/songs/:_id', SongController.updateSong)
  
  // delete song
  app.delete('/api/songs/:_id', SongController.deleteSong)
  
  // like song
  app.post('/api/songs/:_id/like', SongController.likeSong)
}