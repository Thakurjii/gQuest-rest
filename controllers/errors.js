module.exports.get404 = (req, res, next) => {
    res.status(404).json({
        message: "Page Not Found :( "
    })
}

module.exports.get500 = (req, res, next) => {
    res.status(500).json({
        message: "Internal Server Error :( "
    })
}