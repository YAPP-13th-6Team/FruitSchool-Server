var express = require('express')
var router = express.Router()

const fruit = require('./fruit')
const common_sense = require('./common_sense')
const user = require('./user')
const comment = require('./comments')
const community = require('./community')

router.use("/", fruit)
/* 이 밑은 안씀 */ 
router.use("/commonsenses", common_sense)
router.use("/users", user)
router.use("/comments", comment)
router.use("/posts", community)

module.exports = router
