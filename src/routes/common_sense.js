const express = require("express")
const router = express.Router()
const controller = require("../controller/common_senseController")

router.get("/:grade", controller.readByGrade)

module.exports = router