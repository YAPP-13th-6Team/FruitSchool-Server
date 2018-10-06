const express = require("express")
const router = express.Router()
const controller = require("../controller/communityController")
const userCheck = require('../middleware/userCheck')


// 커뮤니티 글 작성 -- 미완
router.post('/',userCheck, controller.createPost);

// 커뮤니티 글 리스트 가져오기
router.get('/lists/sort/:id', userCheck, controller.getAllPosts);

// 커뮤니티 글 상세 조회 
router.get('/:id', userCheck, controller.getPost);

// 커뮤니티 글 삭제
router.delete('/:id',userCheck, controller.deletePost);

// 글 좋아요
router.put('/heart/:id', userCheck,controller.clickHeart);

module.exports = router