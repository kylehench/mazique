const ScoreController = require('../controllers/score.controllers')

module.exports = app => {
  // create score
  app.post('/api/scores', ScoreController.createScore)
  
  // read one score
  app.get('/api/scores/:_id', ScoreController.readOneScore)
  
  // update score
  app.put('/api/scores/:_id', ScoreController.updateScore)
  
  // delete score
  app.delete('/api/scores/:_id', ScoreController.deleteScore)
}