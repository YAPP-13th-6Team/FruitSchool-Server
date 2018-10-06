const Posts = require("../../models/posts")
const { respondJson, respondOnError } = require('../lib/response');

// router.post("/:id", controller.postComment) //댓글 등록
// router.post("/edit/:id", controller.editComment) //댓글 수정
// router.delete("/:id", controller.deleteComment) //댓글 삭제 

/* 댓글 등록 ok*/
function postComment(req, res){
    posts_id = req.params.post_id
    // user_id = req.user.id
    user_id = req.body.user_id
    comment = req.body.comment
    Posts.postComment(posts_id, comment, user_id)
    .then(
        result => {
            console.log("result " + result)
            if(result.nModified === 0) throw new Error('not modified')
            respondJson("Success post "+ posts_id + " comments ", result, res, 201)
        }
    ).catch(
        (err) => { respondOnError(err.message, res, err.statusCode)}
    )
}

/* 댓글 수정 */
function editComment(req, res){
    const comment = Post.get
    posts_id = req.params.id
    // user_id = req.user.id
    user_id = req.body.id
    comment = req.body.comment
    Posts.postComment(posts_id, comment, user_id)
    .then(
        result => {
            console.log("result " + result)
            if(result.nModified === 0) throw new Error('not modified')
            respondJson("Success post "+ posts_id + " comments ", result, res, 201)
        }
    ).catch(
        (err) => { respondOnError(err.message, res, err.statusCode)}
    )
}
/* 댓글 삭제 */
function deleteComment(req, res){

}

module.exports={
    postComment,
    editComment,
    deleteComment
}