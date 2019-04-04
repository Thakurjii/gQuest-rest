var dateTime = require('node-datetime')

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const answerSchema = new Schema({
    answer: {
        type: string,
        required: true
    },
    ansBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ansAt: dateTime.create().format('Y-m-d H:M:S'),
    question: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: {
        type: Number
    }
})

module.exports = mongoose.model('Answer', answerSchema)