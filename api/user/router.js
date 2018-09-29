const express = require("express")
const router = express.Router()
const controller = require("./router.controller")

router.get("/", controller.readAll)


module.exports = router