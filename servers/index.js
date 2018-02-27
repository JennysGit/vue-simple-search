const Models = require('./schema')

module.exports = function(apiRoutes) {
  apiRoutes.post('/search', (req, res) => {
    console.log("hello")
    Models.food.find({}, (err, doc) => {
      if (err) {
        console.log(err)
      } else if (doc) {
        res.send(JSON.strinify(doc))
      }
    })
  })
}
