const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET, (error, decoded) => {
            if (error) {
                next(Error ('Failed to authenticate Token'))
            }
            else {
                req.decoded = decoded;
                next()
            }
        })
    }
    else {
        next(Error('No Token Provided'))
    }
}