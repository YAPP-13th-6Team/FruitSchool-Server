const express = require("express");
const router = express.Router();
const controller = require("../controller/userController");

const userCheck = require('../middleware/userCheck')
// const upload = require('../lib/s3.js').getMulter('user');

/* 한결 */ 
router.get("/", controller.getAllUser); // 모든 유저 조회

/* 다영 */
router.post('/kakao/signin', controller.kakaoSignin) //1. 로그인 

/* 승연 */
// router.get('/mypage',userCheck.check, controller.getUserPage) // 17. 마이페이지 
// router.post('/edit', userCheck.check, upload.array('profile_img'), controller.setUserProfile) // 마이페이지 수정 

module.exports = router