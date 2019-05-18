const Clarifai = require('clarifai')

//import Clarifai API KEY
const app = new Clarifai.App({
  apiKey: 'edb99c5d2b4e4eb3b2f48f5f71c37f22'
})
const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0])
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall
}
