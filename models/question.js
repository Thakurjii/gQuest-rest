const mongoose = require('mongoose')

const Schema = mongoose.Schema
const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    askedBy: {
        type: String,
        ref: 'User',
        required: true
    },
    askedAt: {
        type: String
    },
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    tags: [{
        type: String
    }]
})

module.exports = mongoose.model('Question', questionSchema)