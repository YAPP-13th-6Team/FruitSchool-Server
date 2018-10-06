const express = require("express")
const router = express.Router()
const controller = require("../controller/communityController")

// 커뮤니티 글 작성 -- 미완
router.post('/', controller.createPost);

// 커뮤니티 글 리스트 가져오기
router.get('/list/sort/:id', controller.getAllPosts);

// 커뮤니티 글 상세 조회
router.get('/:id', controller.getPost);

// 커뮤니티 글 삭제
router.delete('/:id', controller.deletePost);

// 글 좋아요
router.put('/heart/:id', controller.clickHeart);

module.exports = router