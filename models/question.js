var dateTime = require('node-datetime')

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const questionSchema = new Schema({
    question: {
        type: string,
        required: true
    },
    askedBy: {
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        required: true
    },
    askedAt: dateTime.create().format('Y-m-d H:M:S'),
    answers: [{
        type: mongoose.Types.ObjectId,
        ref: 'Answer'
    }],
    tags: [{
        type: string
    }]
})

module.exports = mongoose.model('Question', questionSchema)