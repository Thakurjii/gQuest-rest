const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/user')
const UnverifiedUser = require('../models/unverified_users')
const sendMail = require('../utils/send-mail')

module.exports.signup = (req, res, next) => {
    try {
        username = req.body.username
        emailid = req.body.emailid
        password = req.body.password
        interests = req.body.interests
    } catch (err) {
        next(err)
    }
    // main logic goes here...
    if((!/^[A-Za-z]/i.test(username)) || (username.length < process.env.MIN_USERNAME_LENGTH)) {
        err = new Error('Not a valid username :(')
        err.statusCode = 402
        next(err)
    }
    if(password.length < process.env.MIN_PASSWORD_LENGTH) {
        err = new Error('Password must be atleast 8 characters long :)')
        err.statusCode = 402
        next(err)
    }
    if(!interests) {
        err = new Error('The user must have atleast one interests :)')
        err.statusCode = 402
        next(err)
    }
    User.findById(username)
        .then(result => {
            if(result){
                err = new Error('User with given name already Exists :(')
                err.statusCode = 402
                throw err
            }
            return User.findOne({emailid: emailid})
        })
        .then(result => {
            if(result){
                err = new Error('User with given email already Exists :(')
                err.statusCode = 402
                throw err
            }
            // email verification
            name = username
            mailTo = emailid
            confirmationId = jwt.sign({
                username: username,
                emailid: emailid   
            }, process.env.WEB_TOKEN_KEY,{
                expiresIn: '1h'
            })
            mailFrom = "Team.gQuest@gmail.com"

            sendMail({
    to: `${mailTo}`,
    from: `${mailFrom}`,
    subject: 'Email Verification',
    html: `
        <strong style="font-family: 'Montserrat', sans-serif; color: 'black';">Hey ${name},</strong>
        <p style="font-family: 'Montserrat', sans-serif; color: 'black';">Welcome to gQuest.</p>
        <p style="font-family: 'Montserrat', sans-serif; color: 'black';">
        This is a verification mail. Just click on the below mentioned link.</p>
        http://localhost:3000/signup/confirmation/${confirmationId}<br>
    <p style="font-family: 'Montserrat', sans-serif; color: 'black';">gQuest is a place where you can gain and share your knowledge. It is an open source platform built for everyone to interact with people via Questions and Answers</p>
    <p style="font-family: 'Montserrat', sans-serif; color: 'black';">In case you haven't created your account yet.</p>
    <p style="font-family: 'Montserrat', sans-serif; color: 'black';">Visit :- <a href="#">gQuest.com/signup</a></p>
    `,
            })
            unverifiedUser = new UnverifiedUser({
                _id: username,
                emailid: emailid,
                hashedPassword: bcrypt.hashSync(password, parseInt(process.env.BCRYPT_HASH_KEY)),
                interests: interests
            })
            return unverifiedUser.save()
        })
        .then(result => {
            res.json({
                message: `visit ${mailTo} to verify your account`,
            })
        })
        .catch(err => next(err))
}

module.exports.confirmSignup = (req, res, next) => {
    confirmationId = req.params.confirmationId
    // console.log(confirmationId)
    validId = jwt.verify(confirmationId, process.env.WEB_TOKEN_KEY)
    if(!validId){
        err = new Error('Not valid verification :(')
        err.statusCode = 400
        next(err)
    }
    username = validId.username
    console.log(username)
    UnverifiedUser.findByIdAndRemove(username)
        .then(removedUser => {
            verifiedUser = new User({
                _id: removedUser._id,
                emailid: removedUser.emailid,
                hashedPassword: removedUser.hashedPassword,
                interests: removedUser.interests
            })
            return verifiedUser.save()
        })
        .then(result => {
            res.json('Account Verified ;) ')
        })
        .catch(err => next(err))
}