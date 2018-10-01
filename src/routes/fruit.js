const express = require("express")
const router = express.Router()
const controller = require("../controller/fruitController")

router.get("/", controller.readAll)
router.get("/:id", controller.readById)

module.exports = router