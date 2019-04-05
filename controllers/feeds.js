const dateTime = require('node-datetime')
const mongoose = require('mongoose')

const Question = require('../models/question')

module.exports.getIndex = (req, res, next) => {
    res.json([{
        dummyKey: "Dummy Value",
        dummyKey1: "Dummy Value"
    }])
}

module.exports.askQuestion = (req, res, next) => {
    try {
        question = req.body.question
        askedBy = req.body.askedBy
        tags = req.body.tags
    } catch (err) {
        res.json({
            message: err
        })
    }
    question = new Question({
        question: question,
        askedBy: askedBy,
        tags: tags,
        askedAt: dateTime.create().format('Y-m-d H:M:S')
    })
    question.save()
        .then(result => {
            res.json({
                message: result
            })
        })
        .catch(err => {
            console.log(err)
            res.json({
                message: err
            })
        })
}