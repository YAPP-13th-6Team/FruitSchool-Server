const mongoose = require("mongoose"), Schema = mongoose.Schema;
const moment = require("moment");

const Post = new mongoose.Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    content: { type: String },
    createdAt: {type: Date, default: Date.now},
    likes: {type: Number, default: 0},
    heart: [{type: Schema.Types.ObjectId, ref: 'User'}],
    tag:[{type:String, required: false}],
    post_image: [{type: String, required: false}],
    comments: [{
        author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        content: {type: String, required: true},
        createdAt: {type: Date, default: Date.now},
    }]
}, {
    versionKey: false
})

module.exports = mongoose.model('Post', Post)