const express = require("express")
const router = express.Router()
const controller = require("../controller/postsController")

/* 카카오로그인 도입 후*/ 
// router.get("/lists/:sort", controller.getPostsList) // 커뮤니티 게시글 리스트 
// router.get("/lists/:id", controller.getPostsDetail) // 게시글 상세
// router.post("/", controller.postPosts) // 게시글 등록 
// router.post("/:id", controller.updatePosts) // 게시글 수정 
// router.delete("/:id", controller.deletePosts)    // 게시글 삭제

/* 일단 테스트는 */
// router.get("/lists/:sort", controller.getPostsList) // 커뮤니티 게시글 리스트 
// router.get("/lists/:id", controller.getPostsDetail) // 게시글 상세
// router.post("/", controller.postPosts) // 게시글 등록 
// router.post("/:id", controller.updatePosts) // 게시글 수정 
// router.delete("/:id", controller.deletePosts)    // 게시글 삭제

// module.exports = router