const mongoose = require('mongoose')

const Schema = mongoose.Schema
const unverifiedUser = new Schema({
    _id: {
        type: String,
        required: true
    },
    emailid: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "A gQuest User ;)"
    },
    userQuestions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    userAnswers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    followers: [{
        type: String,
        ref: 'User'
    }],
    following: [{
        type: String,
        ref: 'User'
    }],
    interests: [{
        type: String
    }]
})

module.exports = mongoose.model('UnverifiedUser', unverifiedUser)