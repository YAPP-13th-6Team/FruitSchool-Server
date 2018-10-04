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

/* 특정 id의 과일 가져오기 */
function getFruitsById(req, res) {
    const id = req.params.id

    Fruit.findOne({ _id: id }, { "quizs": false }, (err, fruit) => {
        if(err) {
            return res.sendStatus(400)
        }
        if(!fruit) {
            return res.sendStatus(404)
        }
        return res.status(200).json(fruit)
    })
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
            respondJson("Success get guiz " + result.title, result, res, 201)
        }
    ).catch(
        (err) => { respondOnError(err.message, res, 500)}
    )
}

/* 승급문제 받아오기  */
function getExamsByGrade(req, res){
    const grade = req.params.grade
    const CommonSense = require("../../models/common_sense")
    let quizsResult = []
    CommonSense.find({ grade }, projection, (err, commonSenses) => {
        if(err) {
            return res.sendStatus(400)
        }
        if(!commonSenses) {
            return res.sendStatus(404)
        }
        commonSenses.forEach(commonSense => {
            commonSense.quizs.forEach(quiz => {
                quizsResult.push(quiz)
            })
        })
        Fruit.find({ grade }, projection, (err, fruits) => {
            if(err) {
                return res.sendStatus(400)
            }
            if(!fruits) {
                return res.sendStatus(404)
            }
            fruits.forEach(fruit => {
                fruit.quizs.forEach(quiz => {
                    quizsResult.push(quiz)
                })
            })
            const count = quizsResult.length
            for(let i=count; i; i-=1) {
                let j = Math.floor(Math.random() * i)
                let x = quizsResult[i - 1]
                quizsResult[i - 1] = quizsResult[j]
                quizsResult[j] = x
            }
            return res.status(200).json(quizsResult)
        })
    })
    // Fruit.getQuizsById(id)
    // .then(
    //     result => {
    //         if(!result) throw new Error('quizs not found')
    //         console.log(result)
    //         respondJson("Success get guiz " + result.title, result, res, 201)
    //     }
    // ).catch(
    //     (err) => { respondOnError(err.message, res, 500)}
    // )
}

function getFruitsListByTitle(req, res){
    title = req.params.title
    Fruit.getFruitsList(title)
    .then(
        result => {
            if(!result) throw new Error('fruit not found')
            console.log(result)
            respondJson("Success get fruit list search by title", result, res, 201)
        }
    ).catch(
        (err) => { respondOnError(err.message, res, 404)}
    )
}
module.exports = { 
    getAllFruit,
    getFruitsList,
    //  getAllFruitsOrByGrade, 
     getFruitsById, 
     getQuizsById,
     getExamsByGrade,
     getFruitsListByTitle
    }
