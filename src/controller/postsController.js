const Posts = require("../../models/posts")
const { respondJson, respondOnError } = require('../lib/response');
const projection = { "standard_tip._id": false, "intake_tip._id": false, "nutrition_tip._id": false }

router.get("/lists/:sort", controller.getPostsList) // 커뮤니티 게시글 리스트 
router.get("/lists/:id", controller.getPostsDetail) // 게시글 상세
router.post("/", controller.postPosts) // 게시글 등록 
router.post("/:id", controller.updatePosts) // 게시글 수정 
router.delete("/:id", controller.deletePosts)    // 게시글 삭제

/* 커뮤니티 게시글 리스트 */
function getPostsList(req, res) {
    Posts.getAllPosts(req.params.sort)
    .then(
        result => {
            console.log("result" + result)
            if(!result) throw new Error('not found')
            
            respondJson("Success kakaoSignin ", result, res, 201)
        }
    ).catch(
        (err) => { respondOnError(err.message, res, err.statusCode)}
    )
}

/* 게시글 상세 */
/* 게시글 등록  */
function postPosts(req, res){
    content = req.body.content
    Post.createPosts(content)
}
/* 게시글 수정  */
/* 게시글 삭제 */
module.exports={
    getPostsList,
}