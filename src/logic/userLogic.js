const User = require('../../models/user')
// const request = require('request-promise');
const jwt = require('../lib/jwt')
// const s3 = require('../../config/s3').location

function kakaoSignin(jwtToken, accessToken){
     let option = {
        method: 'GET',
        uri: 'https://kapi.kakao.com/v2/user/me',
        json: true,
        headers: {
            'Authorization': "Bearer " + accessToken
        }
    }
    let kakaoUserInfo = request(option);

    //jwt 있으면 유효한지 검사 
    if (jwtToken != undefined) {
        let userInfo = jwt.verify(jwtToken)
        if (userInfo.id == kakaoUserInfo.id) {
            console.log("Success Signin")
            return {
                id: kakaoUserInfo.id,
                grade: userInfo.grade,
                authorization: jwtToken
            }
        }
        else {
            console.log("token expired, generate new token")
            const newToken = jwt.sign(kakaoUserInfo.id, userInfo.grade)
            return {
                id: kakaoUserInfo.id,
                grade: userInfo.grade,
                authorization: newToken
            }
        }
    }
    //jwt를 안받은 경우
    else { 
        //기존 회원
        const dbUserInfo = User.getUserById(kakaoUserInfo.id)
        if (dbUserInfo.length != 0) {
            console.log("other device login")
            const newToken = jwt.sign(kakaoUserInfo.id, dbUserInfo.grade)
            return {
                id: kakaoUserInfo.id,
                grade: dbUserInfo.grade,
                authorization: newToken
            }
        }
        // //새로운 회원 
        // else {
        //     // insertUser
        //     console.log("new user")
        //     let profile_img
        //     // http -> https
        //     if(kakaoUserInfo.properties.hasOwnProperty('thumbnail_image')){
        //         profile_img = 'https' + kakaoUserInfo.properties.thumbnail_image.split('http')[1]
        //     }
        //     else{
        //         profile_img = s3 + '/user/2018/09/26/default_img.png'
        //     }
        //     User.create(kakaoUserInfo.id, kakaoUserInfo.properties.nickname, profile_img)
        //     const newToken = jwt.sign(kakaoUserInfo.id, 0)

        //     return {
        //         id: kakaoUserInfo.id,
        //         grade: 0,
        //         authorization: newToken
        //     }
        // }
    }
}

module.exports = {kakaoSignin}