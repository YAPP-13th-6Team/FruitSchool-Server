const User = require("../../models/user")
const logic = require("../logic/userLogic")
const { respondJson, respondOnError } = require('../lib/response');
const s3 = require('../../config/s3').region
const jwt = require('../lib/jwt')

/* status CODE 다시 정리 필요 */

/* 카카오톡 로그인 */
// function kakaoSignin(req, res) {
    // logic.kakaoSignin(req.headers.authorization, req.body.access_token)
    // .then(
    //     result => {
    //         console.log("result" + result)
    //         if(!result) throw new Error('not found')
            
    //         respondJson("Success kakaoSignin ", result, res, 201)
    //     }
    // ).catch(
    //     (err) => { respondOnError(err.message, res, err.statusCode)}
    // )
// }
async function kakaoSignin (req, res) {
    try {
        const result = await logic.kakaoSignin(req.headers.authorization, req.body.access_token)
        console.log(result)
        respondJson("Success kakaoSignin ", result, res, 201)
    }
    catch (error) {
        respondOnError(error.message, res, error.statusCode)
    }
}

function testSignin(req, res){
    try {
        const token =  jwt.sign("aa", "0")
        console.log(token)
        respondJson("success", token, res, 201)
    }
    catch (error) {
        respondOnError(error.message, res, error.statusCode)

    }
}

/* 테스트용 createUser 실제로는 라우터에서 직접 접근이 아닌 카오톡 로그인을 통해 user 생성 */
function createUser(req, res){
    // const user_id = req.body.user_id
    const nickname = req.body.nickname
    const profile_image = s3 + "/user/2018/10/01/default_img.png"

    User.createUser(nickname, profile_image)
    .then(
        result => {
            if(!result) throw new Error('quizs not found')
            console.log(result)
            respondJson("Success create User " + nickname, result, res, 201)
        }
    ).catch(
        (err) => { respondOnError(err.message, res, err.statusCode)}
    )
}

/* 추후 admin 계정 확인 작업 추가 예정*/
function getAllUser(req, res){
    User.getAllUser(req.headers.authorization)
    .then(
        result => {
            if(!result) throw new Error('quizs not found')
            console.log(result)
            respondJson("Success get all user", result, res, 201)
        }
    ).catch(
        (err) => { respondOnError(err.message, res, err.statusCode)}
    )
}


/* 한결오빠 머지 부분  */
/* not yet*/
//grade 입력 안받아도 될 듯. 
function updateGrade(req, res) {
    /* test에서는 jwt대신 body로 id 받아옴 */
    const id = req.body.id
    // const id = req.user.id //추후 userCheck (jwtToken verify) 미들웨어 사용하면 이걸로 !
    console.log(id)

    // const grade = req.body.grade // 높여줄 등급  


    // User.getUserById(id)
    // .then(
    //     result => {
    //         if(!result) throw new Error('user not found')
    //         console.log(result)
    //         upgrade = (result.grade + 1)
    //         if(upgrade >= 3 || upgrade < 0){
    //             throw new Error('user already has max grade')
    //         }
    //         User.updateGrade(id, upgrade)
    //         .then(
    //             respondJson("Success update grade to " + (result.grade + 1), (result.grade + 1), res, 201)
    //         ).catch((err) => { respondOnError(err.message, res, err.statusCode)})
    //         }
    // ).catch(
    //     (err) => { respondOnError(err.message, res, err.statusCode)}
    // )


    let upgrade;
    User.getUserById(id)
    .then((result) =>{
        console.log(id + " " + result.grade)
        upgrade = (result.grade+1)
        return User.updateGrade(id, upgrade)
    })
    .then((updatedResult) => {
        console.log(updatedResult)
        respondJson("Success update grade to " + upgrade, upgrade, res, 201)
    })
    .catch((err) => { 
        respondOnError(err.message, res, err.statusCode)
    })

    // User.updateGrade(id, upgrade)
    // .then((result)=>{
    //     respondJson("Success update grade to " + updatedResult.grade, updatedResult.grade, res, 201)
    // }).catch((err)=>{
    //     respondOnError(err.message, res, err.statusCode)
    // })

}

/* 마이페이지 ok.*/
function getUserPage(req, res){
    /* test에서는 jwt대신 body로 id 받아옴 */
    const id = req.params.id
    // const id = req.user.user_id //추후 userCheck (jwtToken verify) 미들웨어 사용하면 이걸로 !
    console.log(id)

    User.getUserById(id)
    .then(
        result => {
            if(!result) throw new Error('quizs not found')
            console.log(result)
            respondJson("Success get user " + id, result, res, 201)
        }
    ).catch(
        (err) => { respondOnError(err.message, res, err.statusCode)}
    )
}

/* 추후 추가사항: 프로필사진 수정 */
// function setUserProfileImage(req,res){
//     try {
//         const result = logic.setUserProfileImage(req.headers.authorization)
//         respondJson("Success", result, res, 201)
//     }
//     catch (error) {
//         respondOnError(error.message, res, error.statusCode)
//     }
// }

module.exports = { 
    kakaoSignin, 
    createUser,
    getAllUser,
    updateGrade,
    getUserPage,
    testSignin
    // setUserProfileImage
}


