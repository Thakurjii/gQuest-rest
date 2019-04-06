const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const auth = req.get('Authorization')
    if(!auth){
        err = new Error('Not Authorized :(')
        err.statusCode = 401
        throw err
    }
    token = auth.split(' ')[1]
    // verify the jwt token
    validToken = jwt.verify(token, process.env.WEB_TOKEN_KEY)
    if(!validToken){
        err = new Error('Not a Valid User :( ')
        err.statusCode = 401
        throw err
    }
    req.username = validToken.username
    next()
}