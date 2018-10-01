const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    author: {type: Schema.Types.ObjectId, ref: 'user'},
    content: {type: String, trim: true, required: true},
    createdAt: {type: Date, default: Date.now},
    heart: [{type: Schema.Types.ObjectId, ref: 'user'}],
    comments: [{
        author: {type: Schema.Types.ObjectId, ref: 'user'},
        content: {type: String, required: true},
        createdAt: {type: Date, default: Date.now},
    }]
}, {
    versionKey: false
})

module.exports = mongoose.model('Post', schema)