var express = require('express')
var router = express.Router()

const fruit = require('./fruit')
const common_sense = require('./common_sense')
const user = require('./user')
const comment = require('./comments')

router.use("/fruits", fruit)
router.use("/commonsenses", common_sense)
router.use("/users", user)
router.use("/comments", comment)

module.exports = router
