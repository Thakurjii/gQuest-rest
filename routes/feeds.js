const express = require('express')

const router = express.Router()
const feedController = require('../controllers/feeds')

router.get('/', feedController.getIndex)

module.exports = router