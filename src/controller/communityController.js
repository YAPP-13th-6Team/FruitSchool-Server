const Posts = require("../../models/posts");
const Users = require("../../models/user");
const ObjectId = require("mongoose").Types.ObjectId;
const { respondJson, respondOnError} = require('../lib/response');
const projection = { "heart": false };
const list_projection = { "heart": false , "comments": false };

// 전체 글 가져오기 우선 ok(댓글 개수는 우선 가라로)
function getAllPosts(req, res) {
    // 최신순 정렬
    if (req.params.id == 0) {
        Posts.aggregate([
            {
                $lookup: {
                "from": Users.collection.name,
                "localField": "author",
                "foreignField": "_id",
                "as": "authorInfo"
                }
            }, {
                $sort: {
                    createdAt: -1
                }
            }
        ])
        .exec(function(err, result) {
        if (err) {
          respondOnError(err.message, res, 404);
        }
        respondJson(`Success get posts list sorted by ${req.params.id}`, result, res, 200);
      }); 
    } else { // 좋아요 순 정렬
        Posts.aggregate([
            {
                $lookup: {
                "from": Users.collection.name,
                "localField": "author",
                "foreignField": "_id",
                "as": "authorInfo"
                }
            }, {
                $sort: {
                    likes: -1
                }
            }
        ])
        .exec(function(err, result) {
            if (err) {
                respondOnError(err.message, res, err.statusCode);
            }
            respondJson(`Success get posts list sorted by ${req.params.id}`, result, res, 200);
        });   
    }
    
}

// 글 작성하기 ---- 값이 안들어가는 문제
function createPost(req, res) {
    var post = new Posts({
      author: req.body.userId,
      content: req.body.content,
      tag: req.body.tags,
      post_image: req.body.images,
    });

    post.save()
    .then(item => {
        respondJson("Success", item, res, 200);
    }).catch(err => {
        respondOnError(err.message, res, err.statusCode);
    }); 
}


// 글 삭제하기 ok 
function deletePost(req, res) {
    // 임시 유저정보
    const userId = req.body.userId;
    const post = Posts.findById(req.params.id);
    if (post.author === userId) { //????
        Posts.findByIdAndDelete(req.params.id)
        .then( result => {
            respondJson("Success", result, res, 200);
        }).catch( err => {
            respondOnError(err.message, res, err.statusCode);
        });
    } else {
        respondOnError(err.message, res, 403);
    }
    
}
// 글 상세보기 ok
function getPost(req, res) {
    Posts.aggregate([
		{
            $match: {
                _id: ObjectId(req.params.id)
            }
        },
        {
            $lookup: {
            "from": Users.collection.name,
            "localField": "author",
            "foreignField": "_id",
            "as": "authorInfo"
            }
		}
		
    ])
    .then( post => {
      respondJson("Success", post, res, 200);
    }).catch(err => {
        res.sendStatus(400);
    });
}

// 좋아요 ok
function clickHeart(req, res) {
  const post = Posts.findById(req.params.id);
  console.log(post)
  Posts.findByIdAndUpdate(req.params.id, {
    $inc: { likes : 1 }, 
    // 임시 유저정보임. 수정할 것.
    $push: { heart: req.params.id}
  },{new: true},(err, like) => {
    if (err) return respondOnError(err.message, res, err.statusCode);
    return respondJson("Success", like, res, 200);
  });
  
}

module.exports = { 
  getAllPosts, 
  createPost, 
  getPost, 
  deletePost, 
  clickHeart 
}