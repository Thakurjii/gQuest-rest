const dateTime = require('node-datetime')
const mongoose = require('mongoose')

const Question = require('../models/question')
const Answer = require('../models/answer')

module.exports.getIndex = (req, res, next) => {
    Question.find()
        .then(result => {
            res.json(result)
        })
        .catch(err => next(err))
}

module.exports.askQuestion = (req, res, next) => {
    try {
        question = req.body.question
        askedBy = req.body.askedBy
        tags = req.body.tags
    } catch (err) {
        next(err)
    }
    question = new Question({
        question: question,
        askedBy: askedBy,
        tags: tags,
        askedAt: dateTime.create().format('Y-m-d H:M:S')
    })
    question.save()
        .then(result => {
            res.redirect('/')
        })
        .catch(err => {
            next(err)
        })
}

module.exports.answer = (req, res, next) => {
    try {
        answer = req.body.answer
        ansBy = req.body.ansBy
        question = req.body.question
    } catch (err) {
        next(err)
    }
    ans = new Answer({
        question: question,
        answer:answer,
        ansBy: ansBy,
        ansAt: dateTime.create().format('Y-m-d H:M:S')
    })
    ans.save()
    .then(result => {
        res.redirect('/')
    })
    .catch(err => {
        next(err)
    })
}