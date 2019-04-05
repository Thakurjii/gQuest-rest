const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
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
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    interests: [{
        type: String
    }]
})

module.exports = mongoose.model('User', userSchema)