const mongoose = require('mongoose')

const Schema = mongoose.Schema

const answerSchema = new Schema({
    answer: {
        type: String,
        required: true
    },
    ansBy: {
        type: String,
        ref: 'User',
        required: true
    },
    ansAt: {
        type: String
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    likes: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Answer', answerSchema)