const Posts = require("../../models/posts")
const { respondJson, respondOnError } = require('../lib/response');
/* 테스트용  */

function getAllPosts(req, res){
    Posts.getAllPosts(0)
    .then((result) => {
        console.log(result)
        respondJson("Success all posts ", result, res, 201)
    }).catch((result) => {
        respondOnError(err.message, res, err.statusCode)
    })
}
/* 커뮤니티 게시글 리스트 */
function getPostsList(req, res) {

}

/* 게시글 상세 */
function getPostsDetail(req, res){

}
/* 게시글 등록  */
function postPosts(req, res){
    
}
/* 게시글 수정  */
function updatePosts(req, res){
    
}
/* 게시글 삭제 */
function deletePosts(req, res){
    
}
module.exports={
    getAllPosts,
    getPostsList,
    getPostsDetail,
    postPosts,
    updatePosts,
    deletePosts
}