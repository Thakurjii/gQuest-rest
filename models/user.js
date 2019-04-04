const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    emailid: {
        type: string,
        required: true
    },
    password: {
        type: string,
        required: true
    },
    followers: [{
        type: [mongoose.Types.ObjectId],
        ref: 'User'
    }],
    following: [{
        type: [mongoose.Types.ObjectId],
        ref: 'User'
    }],
    interests: [{
        type: String
    }]
})

module.exports = mongoose.model('User', userSchema)