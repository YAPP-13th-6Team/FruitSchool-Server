const express = require("express")
const router = express.Router()
const controller = require("../controller/fruitController")

router.get("/", controller.readAllOrByGrade)
router.get("/:id", controller.readById)
router.get("/:id/quizs", controller.readByIdAndGetQuizs)

module.exports = router