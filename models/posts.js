const mongoose = require("mongoose")
const moment = require('moment');

const Post = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    content: {type: String, trim: true, required: true},
    createdAt: {type: Date, default: moment().format("YYYY-MM-DD HH:mm:ss")},
    heart: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    tag:[{type:String, required: false}],
    post_image: [{type: String, required: false}],
    comments: [{
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
        content: {type: String, required: true},
        createdAt: {type: Date, default: moment().format("YYYY-MM-DD HH:mm:ss")},
    }]
}, {
    versionKey: false
})

/* 과일 리스트 다 가져오기 ok */
Post.statics.getAllPosts = function(sort) {
    //날짜 정렬 
    // if(sort === 0){ 
        return this.find().sort( { "date": 1 } ).exec()
        // return this.find().sort(date).exec()
    // }
    // // 좋아요 개수 정렬
    // return this.find().
}

/* 댓글달기 ok */
Post.statics.postComment = function(id, comment, user_id){
    let Date = moment().format("YYYY-MM-DD HH:mm:ss")
    return this.update({ _id: id}, { $addToSet: {comments: {author:user_id, content:comment, createAt:Date} } }).exec()
}

module.exports = mongoose.model('Post', Post)