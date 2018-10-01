var express = require('express')
var router = express.Router()
const fruit = require('./fruit')
const common_sense = require('./common_sense')
// const auth = require('./auth')
const user = require('./user')

router.use("/fruits", fruit)
router.use("/commonsenses", common_sense)
// router.use("/auth", auth)
router.unsubscribe("/user", user)

module.exports = router
