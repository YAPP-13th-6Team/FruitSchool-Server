const mongoose = require("mongoose")

const quizSchema = new mongoose.Schema({
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

const schema = new mongoose.Schema({
    grade: { type: Number, required: true, default: 0, min: 0, max: 2 },
    common_sense_tips: [commonSenseSchema],
    quizs: [quizs]
}, {
    versionKey: false
})