const dateTime = require('node-datetime')
const mongoose = require('mongoose')

const Question = require('../models/question')
const Answer = require('../models/answer')
const User = require('../models/user')

module.exports.getIndex = (_req, res, next) => {
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
    // Performing db-related operations with transactions
    let user;
    mongoose.startSession()
        .then(_session => {
            session = _session
            session.startTransaction()
            return User.findById(askedBy)
        })
        .then(loadedUser => {
            user = loadedUser
            question = new Question({
                question: question,
                askedBy: askedBy,
                tags: tags,
                askedAt: dateTime.create().format('Y-m-d H:M:S')
            })
            return question.save()
        })
        .then(question => {
            user.userQuestions.push(question._id)
            return user.save()
        })
        .then(_result => {
            session.commitTransaction()
            res.redirect('/')
        })
        .catch(err => next(err))
}

module.exports.answer = (req, res, next) => {
    try {
        answer = req.body.answer
        ansBy = req.body.ansBy
        question = req.body.question
    } catch (err) {
        next(err)
    }
    // Performing db-related operations with transactions
    let user;
    mongoose.startSession()
        .then(_session => {
            session = _session
            session.startTransaction()
            return User.findById(ansBy)
        })
        .then(loadedUser => {
            user = loadedUser
            ans = new Answer({
                question: question,
                answer:answer,
                ansBy: ansBy,
                ansAt: dateTime.create().format('Y-m-d H:M:S')
            })  
            return ans.save()
        })
        .then(ans => {
            user.userAnswers.push(ans._id)
            return user.save()
        })
        .then(_result => Question.findById(question))
        .then(ques => {
            ques.answers.push(question)
            return ques.save()
        })
        .then(_result => {
            session.commitTransaction()
            res.redirect('/')
        })
        .catch(err => next(err))
}