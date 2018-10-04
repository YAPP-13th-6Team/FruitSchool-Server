const mongoose = require("mongoose")

const Post = new mongoose.Schema({
    author: {type: Schema.Types.ObjectId, ref: 'user'},
    content: {type: String, trim: true, required: true},
    createdAt: {type: Date, default: Date.now},
    heart: [{type: Schema.Types.ObjectId, ref: 'user'}],
    tag:[{type:String, required: false}],
    post_image: [{type: String, required: false}],
    comments: [{
        author: {type: Schema.Types.ObjectId, ref: 'user'},
        content: {type: String, required: true},
        createdAt: {type: Date, default: Date.now},
    }]
}, {
    versionKey: false
})
/* find fruits sorted by - */
User.statics.getAllPosts = function(sort) {
    //날짜 정렬 
    // if(sort === 0){ 
        return this.find().sort( { "date": 1 } ).exec()
        // return this.find().sort(date).exec()
    // }
    // // 좋아요 개수 정렬
    // return this.find().
}

module.exports = mongoose.model('Post', Post)