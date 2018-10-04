const mongoose = require("mongoose"), Schema = mongoose.Schema;

const Post = new mongoose.Schema({
    author: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    content: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    heart: [{type: Schema.Types.ObjectId, ref: 'user'}],
    comments: [{
        author: {type: Schema.Types.ObjectId, ref: 'user', required: true},
        content: {type: String, required: true},
        createdAt: {type: Date, default: Date.now},
    }]
}, {
    versionKey: false
})

module.exports = mongoose.model('Post', Post)