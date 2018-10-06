const User = require("../../models/user")
const logic = require("../logic/userLogic")
const { respondJson, respondOnError } = require('../lib/response');
const s3 = require('../../config/s3').region
const token = require('../lib/jwt')

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
        await respondJson("Success kakaoSignin ", result, res, 201)
    }
    catch (error) {
        respondOnError(error.message, res, error.statusCode)
    }
}
async function token_test(req, res){
    try {
        const result = await token.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTMwNTMzMzMxLCJjb21wYW55IjowLCJpYXQiOjE1Mzg4MjYzNjgsImV4cCI6MTYzMzQzNDM2OH0.BLX6AcfNISr6HrethakFzvmE529j9VIqlG2yok0j7Jc')
        await respondJson("Success ", result, res, 201)
    }
    catch (error) {
        respondOnError(error.message, res, error.statusCode)
    }
}

/* 테스트용 createUser 실제로는 라우터에서 직접 접근이 아닌 카오톡 로그인을 통해 user 생성 */
function createUser(req, res){
    // const user_id = "not kakao login"
    const nickname = req.body.nickname
    const profile_image = s3 + "/user/2018/10/01/default_img.png"

    User.createUser(user_id, nickname, profile_image)
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
    // const id = req.body.id
    const id = req.user.id //추후 userCheck (jwtToken verify) 미들웨어 사용하면 이걸로 !
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
    // let upgrade = (req.user.company +1)
    let upgrade = req.params.grade
    
    console.log(upgrade)
    User.updateGrade(id, upgrade)
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
    // const id = req.params.id
    const id = req.user.id //추후 userCheck (jwtToken verify) 미들웨어 사용하면 이걸로 !
    console.log(id)

    User.getUserById(id)
    .then(
        result => {
            if(!result) throw new Error('users not found')
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
    token_test
    // setUserProfileImage
}


