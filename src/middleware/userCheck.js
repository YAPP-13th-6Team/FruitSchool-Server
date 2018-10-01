const token = require('../lib/jwt')

const { secretKey } = require('../../config/secretKey')
const { respondJson, respondOnError } = require('../lib/response')

exports.check = (req, res, next)=> {
    const { authorization } = req.headers['x-access-token'] || req.query.token
    try {
        req.user = token.verify(authorization)
        if (!req.user) {
            throw new Error('User Authentication Error')
        }
        next()
    } catch (error) {
        respondOnError(error.message, res, 401)
    }

}