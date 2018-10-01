const Fruit = require("../../models/fruit")
const projection = { "standard_tip._id": false, "intake_tip._id": false, "nutrition_tip._id": false }

function readAllOrByGrade(req, res) {
    const grade = req.query.grade
    if(grade) {
        Fruit.find({ grade }, projection, (err, fruits) => {
            if(err) {
                return res.sendStatus(400)
            }
            const count = fruits.length
            if(count === 0) {
                console.log(fruits);
                return res.sendStatus(404)
            }
            return res.status(200).json(fruits)
        })
    } else {
        Fruit.find({}, projection, (err, fruits) => {
            if(err) {
                return res.sendStatus(400)
            }
            const count = fruits.length
            if(count === 0) {
                console.log(fruits);
                return res.sendStatus(404)
            }
            return res.status(200).json(fruits)
        })
    }
}

function readById(req, res) {
    const id = req.params.id
    Fruit.findOne({ _id: id }, projection, (err, fruit) => {
        if(err) {
            return res.sendStatus(400)
        }
        if(!fruit) {
            return res.sendStatus(404)
        }
        return res.status(200).json(fruit)
    })
}

function readByIdAndGetQuizs(req, res) {
    const id = req.params.id
    Fruit.findOne({ _id: id }, projection, (err, fruit) => {
        if(err) {
            return res.sendStatus(400)
        }
        if(!fruit) {
            return res.sendStatus(404)
        }
        return res.status(200).json(fruit.quizs)
    })
}

module.exports = { readAllOrByGrade, readById, readByIdAndGetQuizs }