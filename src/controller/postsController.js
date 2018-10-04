const Posts = require("../../models/posts")
const { respondJson, respondOnError } = require('../lib/response');

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

/* 게시글 수정  */
/* 게시글 삭제 */
module.exports={
    getPostsList,
}