const express = require("express")
const router = express.Router()
const controller = require("./router.controller")

router.get("/:grade", controller.readByGrade)

module.exports = router