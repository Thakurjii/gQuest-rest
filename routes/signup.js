const express = require('express')

const router = express.Router()
const signupController = require('../controllers/signup')

router.get('/confirmation/:confirmationId', signupController.confirmSignup)

router.post('/', signupController.signup)

module.exports = router