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
  if(obj.title){
    res.status(status)
    .json({
      message,
      data: {
        "quizs":{
          "fruit_title": (obj.title) ? obj.title : "",
          "fruit_id": (obj._id) ? obj._id : "",
          "incorrect_answers": (obj.quizs[0].incorrect_answers) ? obj.quizs[0].incorrect_answers : {},
          "title": (obj.quizs[0].title) ? obj.quizs[0].title : "",
          "correct_answer": (obj.quizs[0].correct_answer) ? obj.quizs[0].correct_answer : "",
        }
      }
    });}
    else{
      res.status(status)
      .json({
        message,
        data: {
          "quizs": obj
        } 
      })
    }
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