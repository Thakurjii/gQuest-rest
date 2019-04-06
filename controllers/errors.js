module.exports.get404 = (req, res, next) => {
    err = new Error('Page Not Found :( ')
    err.statusCode = 404
    next(err)
}

module.exports.get500 = (req, res, next) => {
    err = new Error('Internal Server Error :( ')
    err.statusCode = 500
    next(err)
}