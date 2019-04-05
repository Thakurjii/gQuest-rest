const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

module.exports.login = (req, res, next) => {
    try {
        id = req.body.username
        password = req.body.password
    } catch (err) {
        res.json({
            message: err
        })
    }
    let loadedUser;
    User.findById(id)
        .then(user => {
            if(!user){
                const err = new Error('User with the given name is not found')
                err.statusCode = 404
                throw err
            }
            loadedUser = user
            return bcrypt.compare(password, user.hashedPassword)
        })
        .then(isEqual => {
            if(!isEqual){
                const err = new Error('Wrong Password')
                err.statusCode = 401
                throw err
            }
            // jwt creation logic goes here
            const token = jwt.sign({
                emailid: loadedUser.emailid,
                username: loadedUser._id
            },process.env.WEB_TOKEN_KEY,{
                expiresIn: '1h'
            })
            res.json({
                    token: token.toString(),
                    username: loadedUser._id
                })
        })
        .catch(err => {
            res.json({
                message: err
            })
        })
}