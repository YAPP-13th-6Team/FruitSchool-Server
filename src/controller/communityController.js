const Posts = require("../../models/posts");
const Users = require("../../models/user");
const ObjectId = require("mongoose").Types.ObjectId;
const { respondJson, respondOnError} = require('../lib/response');

// 전체 글 가져오기 우선 ok(댓글 개수는 우선 가라로)
function getAllPosts(req, res) {
    // 최신순 정렬
    if (req.params.id == 0) {
        Posts.aggregate([
            {
                $lookup: {
                    "from": Users.collection.name,
                    "localField": "author",
                    "foreignField": "user_id",
                    "as": "author_info"
                }
            }, {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $project: {
                    heart: false , comments: false, tag: false, author: false
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
                "foreignField": "user_id",
                "as": "author_info"
                }
            }, {
                $sort: {
                    likes: -1
                }
            },
            {
                $project: {
                    heart: false , comments: false, tag: false, author: false
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

// 글 작성하기 -- 내 프로필 받아와야함....
function createPost(req, res) {
    var post = new Posts({
      author: req.user.id,
      content: req.body.content,
      post_image: req.body.images,
    });
    post.save()
    .then(item => {
        respondJson(`Success post ${item._id}`, item, res, 200);
    }).catch(err => {
        respondOnError(err.message, res, err.statusCode);
    }); 
}


// 글 삭제하기 ok 
function deletePost(req, res) {
    // 임시 유저정보
    // const userId = req.body.userId;
    const user_id = req.user.id
    const post = Posts.findById(req.params.id);
    // if (post.author === user_id) { //????
        Posts.findByIdAndDelete(req.params.id)
        .then( result => {
            const message = "Success delete posts";
            res.status(200).json({"message": message})
        }).catch( err => {
            respondOnError(err.message, res, err.statusCode);
        });
    // } else {
        // respondOnError(err.message, res, 403);
    //}
    
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
            "foreignField": "user_id",
            "as": "author_info"
            }
        },
        
		{
			$unwind : "$comments"
		},
		{
            $lookup: {
				"from": Users.collection.name,
				"localField": "comments.author",
				"foreignField": "user_id",
				"as": "comments_info",
            }
        },
		{
			$group: {
                "_id": "$_id",
                "author_info": { $first: "$author_info" },
				"createdAt": {$first: "$createdAt"},
				"likes": {$first: "$likes"},
				"post_image": { $first: "$post_image" },
                "comment_count": { $first: "$comment_count" },
                "content": { $first: "$content" },
				"comments": {
                    $push: {
                        comment_id: "$comments._id",
			            user_id: "$comments.author",
				        nickname: "$comments_info.nickname",
				        grade: "$comments_info.grade",
				        comment_content: "$comments.content",
                        createdAt: "$comments.createdAt"
                
                    }
                    
				}
			}
		},
    ])
    .then( post => {	
      respondJson("Success", post, res, 200);
    }).catch(err => {
        res.sendStatus(400);
    });
}

// 좋아요 ok
function clickHeart(req, res) {
    const id = req.user.id 
    // const post = Posts.findById(req.params.id)

    Posts.findByIdAndUpdate(req.params.id, {
    $inc: { likes : 1 }, 
    // 임시 유저정보임. 수정할 것.
    $push: { heart: id}
    },{new: true},(err, like) => {
    if (err) {
		return respondOnError(err.message, res, err.statusCode);
	}
    return respondJson(`Success hearts ${req.params.id}`, like, res, 200);
    });
  
}

module.exports = { 
  getAllPosts, 
  createPost, 
  getPost, 
  deletePost, 
  clickHeart 
}