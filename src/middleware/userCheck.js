const token = require('../lib/jwt')
const { respondJson, respondOnError } = require('../lib/response')

module.exports = async (req, res, next) => {
    const authorization = req.headers['authorization']
    console.log(authorization)
    try {
        req.user = await token.verify(authorization)
        console.log(req.user)
        if (!req.user) {
            throw new Error('User Authentication Error')
        }
        next()
    } catch (error) {
        respondOnError(error.message, res, 401)
    }
}
