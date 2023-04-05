const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization
    }
    else {
        next(Error('No Token Provided'))
    }
}