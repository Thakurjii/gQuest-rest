module.exports.signup = (req, res, next) => {
    try {
        emailid = req.body.emailid
        password = req.body.password
        interests = req.body.interests
    } catch (err) {
        res.json({
            message: err
        })
    }
    // main logic goes here...
}