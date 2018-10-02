const express = require("express")
const router = express.Router()
const controller = require("../controller/fruitController")

router.get("/", controller.getAllFruit)
// router.get("/:id", controller.getFruitsById)
router.get("/exercises/:id", controller.getQuizsById) // 도장깨기 (학습마당)
router.get("/lists", controller.getFruitsList) // 과일 도감 리스트


module.exports = router