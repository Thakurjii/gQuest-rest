const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const feedRoutes = require('./routes/feeds')
const app = express()
const MONGODB_URL = `mongodb+srv://${ process.env.MONGO_USER}:${ process.env.MONGO_PASSWORD}@mymongo-smhht.mongodb.net/${ process.env.MONGO_DATABASE}?retryWrites=true`
const errorController = require('./controllers/errors')

app.use(bodyParser.json()) // aplication/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use(feedRoutes)

app.get('/500', errorController.get500)

app.use(errorController.get404)

app.use((req, res, next) => {
    res.redirect('/500')
})

mongoose.connect(MONGODB_URL, {useNewUrlParser: true})
    .then(client => {
        console.log('[#] Connected to db')
        app.listen(process.env.PORT_NO)
        console.log(`[#] Server listening at port ${process.env.PORT_NO}`)
    })
    .catch(err => {
        res.redirect('/500')
    })