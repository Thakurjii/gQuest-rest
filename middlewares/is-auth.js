module.exports = (req, res, next) => {
    const auth = req.get('Authorization')
    if(!auth){
        err = new Error('Not Authorized :(')
        throw err
    }
    auth = auth.split(' ')[1]
    // verify the jwt token
}