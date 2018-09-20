const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    nickname: String,
    grade: { type: Number, required: true, default: 0, min: 0, max: 2 }
}, {
    versionKey: false
})

module.exports = mongoose.model("user", schema)