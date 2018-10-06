const mongoose = require("mongoose"), Schema = mongoose.Schema;
const moment = require("moment");
// const ObjectId = require("mongoose").Types.ObjectId;

const Post = new mongoose.Schema({
    author: {type: String},
    content: { type: String },
    createdAt: {type: Date, default: moment().format("YYYY-MM-DD HH:mm:ss")},
    likes: {type: Number, default: 0},
    // heart: [{type: Schema.Types.ObjectId, ref: 'User'}],
    heart: [{type: String}] ,
    tag:[{type:String, required: false}],
    post_image: [{type: String, required: false}],
    comment_count: {type: Number, default: 0},
    comments: [{
        author: {type: String,required: true},
        content: {type: String, required: true},
        createdAt: {type: Date, default: moment().format("YYYY-MM-DD HH:mm:ss")},
    }]
}, {
    versionKey: false
})

/* 댓글달기 ok */
Post.statics.postComment = function(id, comment, user_id){
    let Date = moment().format("YYYY-MM-DD HH:mm:ss")
    return this.update({ _id: id}, { $addToSet: {comments: {author:user_id, content:comment, createAt:Date} } }, {$inc: {comment_count : 1}}).exec()
}

module.exports = mongoose.model('Post', Post)