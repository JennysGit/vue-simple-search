const models = require('./db')
const express = require('express')
const router = express.Router()

router.post('/api/search', (req, res) => {
	console.log("search");
})