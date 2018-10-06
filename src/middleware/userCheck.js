const token = require('../lib/jwt')

const { secretKey } = require('../../config/secretKey')
const { respondJson, respondOnError } = require('../lib/response')

exports.check = (req, res, next)=> {
    const { authorization } = req.headers.authorization
    console.log(authorization)
    try {
        req.user = token.verify(authorization)
        console.log(req.user.user_id, req.user.grade)
        if (!req.user) {
            throw new Error('User Authentication Error')
        }
        next()
    } catch (error) {
        respondOnError(error.message, res, 401)
        next()
    }
}