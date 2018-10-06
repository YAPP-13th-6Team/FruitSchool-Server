const express = require("express")
const router = express.Router()
const controller = require("../controller/fruitController")
const userCheck = require('../middleware/userCheck')

router.get("/", userCheck, controller.getAllFruit) //모든 과일 정보
router.get("/exercises/:id", userCheck, controller.getQuizsById) // 도장깨기 (학습마당)
router.get("/lists", userCheck, controller.getFruitsList) // 과일 도감 리스트
router.get("/lists/:title", userCheck, controller.getFruitsListByTitle) // 과일 도감 리스트 검색 
router.get("/exams/:grade", userCheck, controller.getExamsByGrade) // 승급심사 보러가기 
router.get("/:id", userCheck, controller.getFruitsById)    // 과일 세부 정보 (특정 id 쿼리)

module.exports = router