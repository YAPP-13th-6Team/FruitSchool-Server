const express = require("express")
const router = express.Router()
const controller = require("../controller/userController")
/* userCheck = 모든 요청마다 jwtToken(access_token)으로 사용자 인증해주는 미들웨어_테스트 단계에서는 사용 안함. */
const userCheck = require('../middleware/userCheck')
// const upload = require('../lib/s3.js').getMulter('user');

/* 한결 */ 
router.get("/", controller.getAllUser) // 모든 유저 조회 ok
/* 다영 */
router.post('/kakao/signin', controller.kakaoSignin) //1. 로그인 ㄴㄴ

/* 테스트용 createUser 실제로는 라우터에서 직접 접근이 아닌 카오톡 로그인을 통해 user 생성 ok */
router.post("/", controller.createUser)  //ok

// router.post("/duplicated", controller.checkDuplicatedUser)
router.post("/grade", controller.updateGrade)  // ok

/* 승연 */
router.get('/mypage', userCheck, controller.getUserPage) // 17. 마이페이지 
// router.get("/mypage/:id", controller.getUserPage) //마이페이지 ok
// router.post('/edit', userCheck.check, upload.array('profile_img'), controller.setUserProfile) // 마이페이지 수정 
router.get('/token', controller.token_test)
module.exports = router