const mongoose = require("mongoose")
const projection = { "common_sense_tips": false}

const quizSchema = new mongoose.Schema({
    level: Number,
    title: { type: String, required: true },
    correct_answer: { type: String, required: true },
    incorrect_answers: [String]
}, {
    versionKey: false
})

const commonSenseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }
}, {
    versionKey: false
})

const common_sense = new mongoose.Schema({
    grade: { type: Number, required: true, default: 0, min: 0, max: 2 },
    common_sense_tips: [commonSenseSchema],
    quizs: [quizSchema]
}, {
    versionKey: false
})

common_sense.statics.getCommonSenseByGrade = function(grade){
        console.log(grade)
        return this.find({grade}, projection).exec()

}
module.exports = mongoose.model("common_sense", common_sense)