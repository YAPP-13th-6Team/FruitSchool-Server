var express = require('express')
var router = express.Router()
const fruit = require('./fruit')
const common_sense = require('./common_sense')
const user = require('./user')

router.use("/fruits", fruit)
router.use("/commonsenses", common_sense)
router.use("/users", user)

module.exports = router
