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
// result.forEach(commonSense => {
//   commonSense.quizs.forEach(quiz => {
//       quizsResult.push(quiz)

//   })
// })

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
    dara:{
      "quizs": result
    }
  })

  // if(obj.title){
  //   res.status(status)
  //   .json({
  //     message,
  //     data: {
  //       "quizs":[{
  //         "fruit_title": (obj.title) ? obj.title : "",
  //         "fruit_id": (obj._id) ? obj._id : "",
  //         "incorrect_answers": (obj.quizs[0].incorrect_answers) ? obj.quizs[0].incorrect_answers : {},
  //         "title": (obj.quizs[0].title) ? obj.quizs[0].title : "",
  //         "correct_answer": (obj.quizs[0].correct_answer) ? obj.quizs[0].correct_answer : "",
  //       }]
  //     }
  //   });}
  //   else{
  //     res.status(status)
  //     .json({
  //       message,
  //       data: {
  //         "quizs": obj
  //       } 
  //     })
  //   }
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