const express = require("express")
const router = express.Router()
const controller = require("./router.controller")

router.get("/", controller.readAll)
router.get("/:id", controller.readById)

module.exports = router