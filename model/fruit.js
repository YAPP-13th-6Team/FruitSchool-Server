const mongoose = require("mongoose")

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    correct_answer: { type: String, required: true },
    incorrect_answers: [String]
}, {
    versionKey: false
})

const nutritionSchema = new mongoose.Schema({
    //단위: mg
    sodium: Number,
    //단위: g
    protein: Number,
    //단위: g
    sugar: Number
}, {
    versionKey: false
})

const intakeSchema = new mongoose.Schema({
    intake_method: String,
    chemistry: String,
    diet: String,
    effect: String
}, {
    versionKey: false
})

const standardSchema = new mongoose.Schema({
    purchasing_tip: String,
    storage_temperature: String,
    storage_date: String,
    storage_method: String,
    care_method: String

}, {
    versionKey: false
})

const schema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    grade: { type: Number, required: true, min: 0, max: 2 },
    category: { type: String, required: true },
    //단위: kcal/100g
    calorie: { type: Number, required: true },
    standardInfo: standardSchema,
    intakeInfo: intakeSchema,
    nutritionInfo: nutritionSchema,
    quizs: [quizSchema]
}, {
    versionKey: false
})

module.exports = mongoose.model("fruit", schema)