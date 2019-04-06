const express = require('express')

const router = express.Router()
const feedController = require('../controllers/feeds')
const auth = require('../middlewares/is-auth')

router.post('/ask', auth, feedController.askQuestion)

router.post('/answer', auth, feedController.answer)

router.get('/', feedController.getIndex)

module.exports = router