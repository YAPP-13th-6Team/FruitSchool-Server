const express = require("express")
const router = express.Router()
const controller = require("../controller/fruitController")

router.get("/", controller.getAllFruit)
// router.get("/:id", controller.getFruitsById)
router.get("/exercises/:id", controller.getQuizsById) // 도장깨기 (학습마당)
router.get("/lists", controller.getFruitsList) // 과일 도감 리스트
router.get("/lists/:title", controller.getFruitsListByTitle) // 과일 도감 리스트 검색 
router.get("/exams", controller.getExamsByGrade) // 승급심사 보러가기 

module.exports = router