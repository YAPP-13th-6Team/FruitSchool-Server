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

const getQuizsById = async(req, res) =>{
    try{
        const id = req.params.id
        if(is_objectid(id)){
            let quiz = await Fruit.getQuizsById(id)
            console.log(quiz)
            respondquizJson("Success get guiz " + quiz.title, [quiz], res, 201)
        }else{
            throw new Error('fruit not found')
        }
    }catch(err){
        console.log(err)
        if(err.message == 'fruit not found'){respondOnError(err.message, res, 400)}
        else{respondOnError(err.message, res, err.statusCode)}
    }
}

/* 승급문제 받아오기  */
const getExamsByGrade = async(req, res) => {
    try{
        const grade = req.params.grade
        if(grade >= 3) {
            throw new Error('url params must be 0~2')
        }
        let quizsResult = []
        let fruit_quizs = []

        let easy  = await Fruit.getFruitByGrade(grade)
        easy.forEach(fruit => {
            // console.log(fruit)
            let j = Math.floor(Math.random() * fruit.quizs.length)
            let afruit = {
                _id:fruit._id,
                title: fruit.title,
                quizs : [fruit.quizs[j]]
            }
            // console.log(quiz)
            fruit_quizs.push(afruit)
        })
        for(let i=fruit_quizs.length; i; i-=1) {
            let j = Math.floor(Math.random() * i)
            let x = fruit_quizs[i - 1]
            fruit_quizs[i - 1] = fruit_quizs[j]
            fruit_quizs[j] = x
        }
        console.log(fruit_quizs.length)
        if(fruit_quizs.length > 7){ 
            await fruit_quizs.splice(8, -1) 
            console.log(fruit_quizs.length)
        }

        let difficult = await CommonSense.getCommonSenseByGrade(grade)
        difficult.forEach(commonSense => {
            commonSense.quizs.forEach(quiz => {
                quizsResult.push(quiz)
            })
        })
        quizsResult = await quizsResult.concat(fruit_quizs)
        for(let i=quizsResult.length; i; i-=1) {
            let j = Math.floor(Math.random() * i)
            let x = quizsResult[i - 1]
            quizsResult[i - 1] = quizsResult[j]
            quizsResult[j] = x
        }
        console.log(quizsResult.length)
        console.log(quizsResult)
        respondquizJson("Success get exam by grade", quizsResult, res, 201)
    }catch(err){
        console.log(err)
        if(err.message == 'url params must be 0~2'){respondOnError(err.message, res, 400)}
        else{respondOnError(err.message, res, err.statusCode)}
    }
}

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

module.exports = { 
    getAllFruit,
    getFruitsList,
     getFruitsById, 
     getQuizsById,
     getExamsByGrade,
     getFruitsListByTitle
    }
