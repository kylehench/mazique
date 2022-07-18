const Score = require('../models/score.model')

module.exports.createScore = (request, response) => {
  Score.create(request.body)
    .then(score => response.json(score))
    .catch(err => response.status(400).json(err))
}

module.exports.readOneScore = (request, response) => {
  Score.findOne({_id: request.params._id})
    .then(score => response.json(score))
    .catch(err => response.status(400).json(err))
}

module.exports.updateScore = (request, response) => {
  Score.findOneAndUpdate({_id: request.params._id}, request.body, {new: true})
  .then(score => response.json(score))
  .catch(err => response.status(400).json(err))
}

module.exports.deleteScore = (request, response) => {
  Score.deleteOne({_id: request.params._id})
    .then(deleteConfirmation => response.json(deleteConfirmation))
    .catch(err => response.status(400).json(err))
}