const express = require("express")
const router = express.Router()
const controller = require("../controller/fruitController")
const userCheck = require('../middleware/userCheck')

router.get("/lists", controller.getFruitsList) // 과일 도감 리스트
router.get("/", controller.getAllFruit) //모든 과일 정보
router.get("/exercises/:id", controller.getQuizsById) // 도장깨기 (학습마당)
router.get("/exams/:grade", controller.getExamsByGrade) // 승급심사 보러가기 

router.get("/lists/:title", controller.getFruitsListByTitle) // 과일 도감 리스트 검색 
router.get("/:id", controller.getFruitsById)    // 과일 세부 정보 (특정 id 쿼리)

module.exports = router