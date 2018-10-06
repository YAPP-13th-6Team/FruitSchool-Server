const express = require("express")
const router = express.Router()
const controller = require("../controller/common_senseController")
const userCheck = require('../middleware/userCheck')

router.get("/:grade", userCheck, controller.readByGrade)

module.exports = router