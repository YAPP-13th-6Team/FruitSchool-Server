const Fruit = require("../../models/fruit")
const CommonSense = require("../../models/common_sense")
const ObjectId = require("mongoose").Types.ObjectId;
const { respondJson, respondquizJson,  respondOnError } = require('../lib/response');
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

/* 학습문제 받아오기 ok. */
function getQuizsById(req, res) {
    const id = req.params.id
    Fruit.getQuizsById(id)
    .then(
        result => {
            if(!result) throw new Error('quizs not found')
            console.log(result)
            // respondJson("Success get guiz " + result.title, result, res, 201)
            respondquizJson("Success get guiz " + result.title, result, res, 201)
        }
    ).catch(
        (err) => { respondOnError(err.message, res, 500)}
    )
}

/* 승급문제 받아오기  */
function getExamsByGrade(req, res){
    const grade = req.params.grade
    let quizsResult = []

    CommonSense.getCommonSenseByGrade(grade)
    .then(
        result => {
            if(!result) throw new Error('quizs not found')
            // console.log(result)
            result.forEach(commonSense => {
                commonSense.quizs.forEach(quiz => {
                    quizsResult.push(quiz)
                })
            })
        }
    ).catch(
        (err) => { respondOnError(err.message, res, 404)}
    )

    Fruit.getFruitByGrade(grade)
    .then(
            result => {
                if(!result) throw new Error('quizs not found')
                // console.log(result)
                result.forEach(fruit => {
                    fruit.quizs.forEach(quiz => {
                       quizsResult.push(quiz)
                   })
                })
            }
    )
    .then(
        result => {
            let count = quizsResult.length
            for(let i=count; i; i-=1) {
                let j = Math.floor(Math.random() * i)
                let x = quizsResult[i - 1]
                quizsResult[i - 1] = quizsResult[j]
                quizsResult[j] = x
            }
            console.log(quizsResult)
            respondquizJson("Success get exam by grade ", quizsResult, res, 201)
        }
    ).catch(
        (err) => { respondOnError(err.message, res, 404)}
    )


    // CommonSense.find({ grade }, projection, (err, commonSenses) => {
    //     if(err) {
    //         return res.sendStatus(400)
    //     }
    //     if(!commonSenses) {
    //         return res.sendStatus(404)
    //     }
    //     commonSenses.forEach(commonSense => {
    //         commonSense.quizs.forEach(quiz => {
    //             quizsResult.push(quiz)
    //         })
    //     })
    //     Fruit.find({ grade }, projection, (err, fruits) => {
    //         if(err) {
    //             return res.sendStatus(400)
    //         }
    //         if(!fruits) {
    //             return res.sendStatus(404)
    //         }
    //         fruits.forEach(fruit => {
    //             fruit.quizs.forEach(quiz => {
    //                 quizsResult.push(quiz)
    //             })
    //         })
    //         const count = quizsResult.length
    //         for(let i=count; i; i-=1) {
    //             let j = Math.floor(Math.random() * i)
    //             let x = quizsResult[i - 1]
    //             quizsResult[i - 1] = quizsResult[j]
    //             quizsResult[j] = x
    //         }
    //         let result = {
    //             message: "Success get exam by grade",
    //             data: quizsResult
    //         }
    //         return res.status(200).json(result)
    //     })
    // })
}

/* 과일 이름으로 검색 */
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

/* 특정 id의 과일 가져오기 */
function getFruitsById(req, res) {
    const id = req.params.id
    // const id = req.user.id
    Fruit.aggregate([
        { $match: {_id: ObjectId(id) }},
        { $project: {"standard_tip._id": false, "intake_tip._id": false, "nutrition_tip._id": false}}
    ]).then(result => {
        // res.status(200).json(result)
        respondJson("Success get fruits " + id, result, res, 201)
    }).catch(
        (err) => { respondOnError(err.message, res, 500)}
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
