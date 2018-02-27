const models = require('./db')
const express = require('express')
const router = express.Router()

router.get('/api/search', (req, res) => {
  console.log("request", req);
  models.food.find({}, null, { limit: 10 }, function(err, result) {
    res.json({ data: result })
  })
})

module.exports = router;
