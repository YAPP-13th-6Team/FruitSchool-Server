const moment = require('moment');

const respondJson = (message, obj, res, status) => {
  console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')} => message : ${message} / status : ${status}`)
  res
    .status(status)
    .json({
      message,
      data: (obj) ? obj : {}
    });
}
const respondquizJson = (message, obj, res, status) =>{
  console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')} => message : ${message} / status : ${status}`)
  var result = new Array()
  obj.forEach(aobj =>{
      var aquiz = new Object()
      if(aobj.quizs){
        aobj.quizs.forEach(quizs=>{
          aquiz.fruit_title =  aobj.title
          aquiz.fruit_id = aobj._id
          aquiz.incorrect_answers = (quizs.incorrect_answers) ? quizs.incorrect_answers : []
          aquiz.title = (quizs.title) ? quizs.title : ""
          aquiz.correct_answer = (quizs.correct_answer) ? quizs.correct_answer : ""
        })
      }
      else{
        aquiz.fruit_title =  ""
        aquiz.fruit_id = ""
        aquiz.incorrect_answers = (aobj.incorrect_answers) ? aobj.incorrect_answers : []
        aquiz.title = (aobj.title) ? aobj.title : ""
        aquiz.correct_answer = (aobj.correct_answer) ? aobj.correct_answer : ""
      }
      result.push(aquiz)
  })
  
  res.status(status)
  .json({
    message,
    data:{
      "quizs": result
    }
  })
}

const respondOnError = (message, res, status) => {
  console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')} => message : ${message} / status : ${status}`)
  res
    .status(status)
    .json({
      message
    });
}
  
module.exports = {  respondJson, respondquizJson, respondOnError}