const Fruit = require("../../models/fruit")
const CommonSense = require("../../models/common_sense")
const ObjectId = require("mongoose").Types.ObjectId;
const { respondJson, respondquizJson,  respondOnError } = require('../lib/response');
const projection = { "standard_tip._id": false, "intake_tip._id": false, "nutrition_tip._id": false }

/* 모든 과일 ok */
const getAllFruit = async(req, res)=> {
    try{
        let fruits = await Fruit.getAllFruit() 
        console.log(fruits)
        respondJson("Success get all Fruits", fruits, res, 201)
    }catch(err){
        console.log(err)
        respondOnError(err.message, res, err.statusCode)
    }
}

/* 과일 도감 리스트 ok */
// function getFruitsList(req, res){
        // Fruit.getFruitsList()
    // .then(
    //     result => {
    //         if(!result) throw new Error('fruits not found')
    //         console.log(result)
    //         respondJson("Success get fruits list sorted by grade", result, res, 201)
    //     }
    // ).catch(
    //     (err) => { respondOnError(err.message, res, 404)}
    // )
// }
const getFruitsList = async(req, res)=>{

    try{
        let fruitlists  =await Fruit.getFruitsList()
        console.log(fruitlists)
        respondJson("Success get fruits list sorted by grade", fruitlists, res, 201)
    }catch(err){
        console.log(err)
        respondOnError(err.message, res, err.statusCode)
    }

}

/* 학습문제 받아오기 ok. */
// function getQuizsById(req, res) {
//     const id = req.params.id
//     Fruit.getQuizsById(id)
//     .then(
//         result => {
//             if(!result) throw new Error('quizs not found')
//             console.log(result)
//             respondquizJson("Success get guiz" + result.title, [result], res, 201)
//         }
//     ).catch(
//         (err) => { respondOnError(err.message, res, 500)}
//     )
// }
const getQuizsById = async(req, res) =>{
    try{
        const id = req.params.id
        let quiz = await 
        Fruit.getQuizsById(id)
        console.log(quiz);
        respondquizJson("Success get guiz " + quiz.title, [quiz], res, 201)
    }catch(err){
        console.log(err)
        respondOnError(err.message, res, err.statusCode)
    }
}

/* 승급문제 받아오기  */
const getExamsByGrade = async(req, res) => {
    try{
        const grade = req.params.grade
        let quizsResult = []

        let difficult = await CommonSense.getCommonSenseByGrade(grade)
        difficult.forEach(commonSense => {
            commonSense.quizs.forEach(quiz => {
                quizsResult.push(quiz)
            })
        })

        let easy  = await Fruit.getFruitByGrade(grade)
        easy.forEach(fruit => {
            quizsResult.push(fruit)
        })

        let count = quizsResult.length
        for(let i=count; i; i-=1) {
            let j = Math.floor(Math.random() * i)
            let x = quizsResult[i - 1]
            quizsResult[i - 1] = quizsResult[j]
            quizsResult[j] = x
        }
        console.log(quizsResult)
        respondquizJson("Success get exam by grade", quizsResult, res, 201)
    }catch(err){
        console.log(err)
        respondOnError(err.message, res, err.statusCode)
    }
}

// function getExamsByGrade(req, res){
//     const grade = req.params.grade
//     let quizsResult = []

//     CommonSense.getCommonSenseByGrade(grade)
//     .then(result => {
//             if(!result) throw new Error('quizs not found')
//             result.forEach(commonSense => {
//                 commonSense.quizs.forEach(quiz => {
//                     quizsResult.push(quiz)
//                 })
//             })
//             return Fruit.getFruitByGrade(grade)
//     }).then(
//          result => {
//             if(!result) throw new Error('quizs not found')
//             result.forEach(fruit => {
//                 quizsResult.push(fruit)
//             })
//             return quizsResult
//         }
//     )
//     .catch(
//         (err) => { respondOnError(err.message, res, 404)}
//     )
//     .then(
//         result => {
//             let count = quizsResult.length
//             for(let i=count; i; i-=1) {
//                 let j = Math.floor(Math.random() * i)
//                 let x = quizsResult[i - 1]
//                 quizsResult[i - 1] = quizsResult[j]
//                 quizsResult[j] = x
//             }
//             console.log(quizsResult)
//             respondquizJson("Success get exam by grade", quizsResult, res, 201)
//         }
//     ).catch(
//         (err) => { respondOnError(err.message, res, 404)}
//     )
//     // CommonSense.find({ grade }, projection, (err, commonSenses) => {
//     //     if(err) {
//     //         return res.sendStatus(400)
//     //     }
//     //     if(!commonSenses) {
//     //         return res.sendStatus(404)
//     //     }
//     //     commonSenses.forEach(commonSense => {
//     //         commonSense.quizs.forEach(quiz => {
//     //             quizsResult.push(quiz)
//     //         })
//     //     })
//     //     Fruit.find({ grade }, projection, (err, fruits) => {
//     //         if(err) {
//     //             return res.sendStatus(400)
//     //         }
//     //         if(!fruits) {
//     //             return res.sendStatus(404)
//     //         }
//     //         fruits.forEach(fruit => {
//     //             fruit.quizs.forEach(quiz => {
//     //                 quizsResult.push(quiz)
//     //             })
//     //         })
//     //         const count = quizsResult.length
//     //         for(let i=count; i; i-=1) {
//     //             let j = Math.floor(Math.random() * i)
//     //             let x = quizsResult[i - 1]
//     //             quizsResult[i - 1] = quizsResult[j]
//     //             quizsResult[j] = x
//     //         }
//     //         let result = {
//     //             message: "Success get exam by grade",
//     //             data: quizsResult
//     //         }
//     //         return res.status(200).json(result)
//     //     })
//     // })
// }

/* 과일 이름으로 검색 */

const getFruitsListByTitle = async(req, res) => {
    try{
        title = req.params.title
        let fruit = await Fruit.getFruitsList(title)
        if(JSON.stringify(fruit) == '[]'){
            throw new Error('fruit not found')
        }else{        
            console.log(fruit)
            respondJson("Success get fruit list search by title", fruit, res, 201)
        }
    }catch(err){
        console.log(err)
        if(err.message == 'fruit not found'){respondOnError(err.message, res, 400)}
        else{respondOnError(err.message, res, err.statusCode)}
    }
}
// function getFruitsListByTitle(req, res){
//     title = req.params.title
//     Fruit.getFruitsList(title)
//     .then(
//         result => {
//             if(!result) throw new Error('fruit not found')
//             console.log(result)
//             respondJson("Success get fruit list search by title", result, res, 201)
//         }
//     ).catch(
//         (err) => { respondOnError(err.message, res, 404)}
//     )
// }


/* 특정 id의 과일 가져오기 */
const getFruitsById = async(req, res)=>{
    try{
        const id = req.params.id
        if(is_objectid(id)){
            let fruit = await Fruit.getFruitsById(id)
            console.log(fruit)
            respondJson("Success get fruits " + id, fruit, res, 201)
        }else{
            throw new Error('fruit not found')
        }
    }catch(err){
        console.log(err.status)
        if(err.message == 'fruit not found'){respondOnError(err.message, res, 400)}
        else{respondOnError(err.message, res, err.statusCode)}
    }
}
function is_objectid(id){
    var hex = /[0-9A-Fa-f]{24}/g;
    if (hex.test(id)) return true
    else return false
}
// function getFruitsById(req, res) {
//     const id = req.params.id
//     // Fruit.aggregate([
//     //     { $match: {_id: ObjectId(id) }},
//     //     { $project: {"standard_tip._id": false, "intake_tip._id": false, "nutrition_tip._id": false, "quizs":false}}
//     // ])
//     Fruit.getFruitsById(id)
//     .then(result => {
//         respondJson("Success get fruits" + id, result, res, 201)
//     }).catch(
//         (err) => { respondOnError(err.message, res, 500)}
//     )
// }
module.exports = { 
    getAllFruit,
    getFruitsList,
    //  getAllFruitsOrByGrade, 
     getFruitsById, 
     getQuizsById,
     getExamsByGrade,
     getFruitsListByTitle
    }
