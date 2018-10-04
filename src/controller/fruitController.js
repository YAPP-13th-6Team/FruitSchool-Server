const Fruit = require("../../models/fruit")
const { respondJson, respondOnError } = require('../lib/response');
const projection = { "standard_tip._id": false, "intake_tip._id": false, "nutrition_tip._id": false }

/* 모든 과일 ok */
function getAllFruit(req, res) {
    Fruit.getAllFruit()
    .then(
        result => {
            if(!result) throw new Error('fruits not found')
            console.log(result)
            respondJson("Success get all Fruits", result, res, 201)
        }
    ).catch(
        (err) => { respondOnError(err.message, res, err.statusCode)}
    )
}

/* 과일 도감 리스트 ok */
function getFruitsList(req, res){
    Fruit.getFruitsList()
    .then(
        result => {
            if(!result) throw new Error('fruits not found')
            console.log(result)
            respondJson("Success get fruits list sorted by grade", result, res, 201)
        }
    ).catch(
        (err) => { respondOnError(err.message, res, 404)}
    )
}
// function getAllFruitsOrByGrade(req, res) {
//     const grade = req.query.grade
//     if(grade) {
//         Fruit.find({ grade }, projection, (err, fruits) => {
//             if(err) {
//                 return res.sendStatus(400)
//             }
//             const count = fruits.length
//             if(count === 0) {
//                 console.log(fruits);
//                 return res.sendStatus(404)
//             }
//             return res.status(200).json(fruits)
//         })
//     } else {
//         Fruit.find({}, projection, (err, fruits) => {
//             if(err) {
//                 return res.sendStatus(400)
//             }
//             const count = fruits.length
//             if(count === 0) {
//                 console.log(fruits);
//                 return res.sendStatus(404)
//             }
//             return res.status(200).json(fruits)
//         })
//     }
// }
// function getFruitsById(req, res) {
//     const id = req.params.id //fruit._id
//     Fruit.findOne({ _id: id }, projection, (err, fruit) => {
//         if(err) {
//             return res.sendStatus(400)
//         }
//         if(!fruit) {
//             return res.sendStatus(404)
//         }
//         return res.status(200).json(fruit)
//     })
// }

/* 학습문제 받아오기 ok. */
function getQuizsById(req, res) {
    // const id = req.params.id //fruit._id
    // Fruit.findOne({ _id: id }, projection, (err, fruit) => {
    //     if(err) {
    //         return res.sendStatus(400)
    //     }
    //     if(!fruit) {
    //         return res.sendStatus(404)
    //     }
    //     return res.status(200).json(fruit.quizs)
    // })
    id = req.params.id
    Fruit.getQuizsById(id)
    .then(
        result => {
            if(!result) throw new Error('quizs not found')
            console.log(result)
            respondJson("Success get guiz " + result.title, result.quizs, res, 201)
        }
    ).catch(
        (err) => { respondOnError(err.message, res, 500)}
    )
}
module.exports = { 
    getAllFruit,
    getFruitsList,
    //  getAllFruitsOrByGrade, 
    //  getFruitsById 
     getQuizsById
    }
