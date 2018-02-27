const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
  title: String,
  subtitle: String,
  image: String,
  steps: Array,
  ingredients: Array,
  common: Object,
  guide: Object,
  suits: Array,
  restraints: Array,
  tags: Array,
});
const Models = {
  food: mongoose.model('datas', Schema)
}
mongoose.connect('mongodb://root:123456@ds247678.mlab.com:47678/zhangchu-foods')
const db = mongoose.connection

db.on('error', () => {
  console.log("db connection error")
})

db.once('open', () => {
  console.log("db has connected.")
})

module.exports = Models
