const express = require("express")
const router = express.Router()
const controller = require("./router.controller")

router.post("/user", controller.createUser)
router.post("/grade", controller.updateGrade)

module.exports = router