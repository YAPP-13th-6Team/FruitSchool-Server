const mongoose = require("mongoose")
const projection = { "standard_tip._id": false, "intake_tip._id": false, "nutrition_tip._id": false }

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    difficulty: {type: String, required: true},
    correct_answer: { type: String, required: true },
    incorrect_answers: [String]
}, {
    versionKey: false
})

const nutritionSchema = new mongoose.Schema({
    sodium: { type: Number, required: true },   //단위: mg
    protein: { type: Number, required: true },  //단위: g
    sugar: { type: Number, required: true }     //단위: g
}, {
    versionKey: false
})

const intakeSchema = new mongoose.Schema({
    intake_method: { type: String, required: true },
    chemistry: String,
    precaution: String,
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

const Fruit = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    image_path: {type: String, required: true, unique: true},
    grade: { type: Number, required: true, min: 0, max: 2 },
    category: { type: String, required: true },
    calorie: { type: Number, required: true },  //단위: kcal/100g
    season: { type: String, required: true },
    standard_tip: standardSchema,
    intake_tip: intakeSchema,
    nutrition_tip: nutritionSchema,
    quizs: [quizSchema]
}, {
    versionKey: false
})

/* find all fruit by using grade */
Fruit.statics.getAllFruit = function() {
    return this.find({}, projection).exec()
}

Fruit.statics.getFruitsList = function(title){
    if(title){
        console.log(title)
        return this.find({title}).select('_id title image_path grade').sort('grade').exec()
    }
    return this.find({}).select('_id title image_path grade').sort('grade').exec()
}

/* find one fruit by using id or grade */
Fruit.statics.getFruitById = function(id) {
    return this.find({id}, projection).exec()
}

/* find one fruit by using id or grade */
Fruit.statics.getFruitByGrade = function(grade) {
    return this.find({grade}, projection).exec()
}

/* find one fruit by using id or grade */
Fruit.statics.getQuizsById = function(id) {
    return this.findOne({ _id: id }).select('_id title quizs').exec()
}

module.exports = mongoose.model("Fruit", Fruit)