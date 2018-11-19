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
const respondquizJson = async(message, obj, res, status) =>{
  console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')} => message : ${message} / status : ${status}`)
  var result = new Array()

  await obj.forEach(aobj =>{
      if(aobj.quizs){
        console.log(aobj.quizs)
        aobj.quizs.forEach(quizs=>{
          var aquiz = new Object()
          console.log(quizs)
          aquiz.fruit_title =  aobj.title
          aquiz.fruit_id = aobj._id
          aquiz.incorrect_answers = (quizs.incorrect_answers) ? quizs.incorrect_answers : []
          aquiz.title = (quizs.title) ? quizs.title : ""
          aquiz.correct_answer = (quizs.correct_answer) ? quizs.correct_answer : ""
          result.push(aquiz)
        })
      }
      else{
        var aquiz = new Object()
        aquiz.fruit_title =  ""
        aquiz.fruit_id = ""
        aquiz.incorrect_answers = (aobj.incorrect_answers) ? aobj.incorrect_answers : []
        aquiz.title = (aobj.title) ? aobj.title : ""
        aquiz.correct_answer = (aobj.correct_answer) ? aobj.correct_answer : ""
        result.push(aquiz)
      }
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