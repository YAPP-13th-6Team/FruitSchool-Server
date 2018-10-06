const User = require('../../models/user')
const request = require('request-promise');
const jwt = require('../lib/jwt')
const s3 = require('../../config/s3').region


    // check username duplication
    // requestKakao(req.headers.authorization, req.body.access_token)
    // .then()
    // .then(count)
    // .then(assign)
    // .then(respond)
    // .catch(onError)
    // module.exports= {
    //     kakaoSignin : function(jwtToken, accessToken){
    //      let option = {
    //         method: 'GET',
    //         uri: 'https://kapi.kakao.com/v2/user/me',
    //         json: true,
    //         headers: {
    //             'Authorization': "Bearer " + accessToken
    //         }
    //     }
    //     console.log(jwtToken)
    //     console.log(accessToken)
    
    //     let kakaoUserInfo = request(option, function(err, res, body) { 
    //         console.log(body); 
    //         //jwt 있으면 유효한지 검사 
    //         if (jwtToken != undefined) {
    //             let userInfo = jwt.verify(jwtToken)
    
    //             if (userInfo.id == body.id) {
    //                 console.log("Success Signin")
    //                 return {
    //                     id: body.id,
    //                     grade: userInfo.grade,
    //                     authorization: jwtToken
    //                 }
    //             }
    //             else {
    //                 console.log("token expired, generate new token")
    //                 const newToken = jwt.sign(body.id, userInfo.grade)
    //                 return {
    //                     id: body.id,
    //                     grade: userInfo.grade,
    //                     authorization: newToken
    //                 }
    //             }
    //         }
    
    //         //jwt를 안받은 경우
    //         else { 
    //             //기존 회원
    //             const dbUserInfo = User.isUser(body.id)
    //             console.log("body : " + body.id)
    //             console.log(dbUserInfo)
    
    //             if (dbUserInfo === 1) {
    //                 // console.log("dbUserInfo" + dbUserInfo)
    //                 console.log("other device login")
    //                 const newToken = jwt.sign(body.id, dbUserInfo.grade)
                
    //                 return {
    //                     id: body.id,
    //                     grade: dbUserInfo.grade,
    //                     authorization: newToken
    //                 }
    //             }
    //             //새로운 회원 
    //             else {
    //                 // insertUser
    //                 console.log("new user")
    //                 let profile_img
    //                 // http -> https
    //                 if(body.properties.hasOwnProperty('thumbnail_image')){
    //                     profile_img = 'https' + body.properties.thumbnail_image.split('http')[1]
    //                 }
    //                 else{
    //                     profile_img = s3 + '/user/2018/10/01/default_img.png'
    //                 }
    //                 console.log(profile_img)
    
    //                 User.create(body.id, body.properties.nickname, profile_img)
    //                 .then((result) => {
    //                     return newToken = jwt.sign(body.id, 0)
    //                 }).then((result) => {
    //                     console.log(result)
    //                     return {
    //                         id: body.id,
    //                         grade: 0,
    //                         authorization: newToken
    //                     }
    //                 }).catch(
    //                     (err) => {return err}
    //                 )
                    
    //             }
    //         }
    //     });
    
    // }}

module.exports= {
kakaoSignin : async function(jwtToken, accessToken){
     let option = {
        method: 'GET',
        uri: 'https://kapi.kakao.com/v2/user/me',
        json: true,
        headers: {
            'Authorization': "Bearer " + accessToken
        }
    }
    console.log(jwtToken)
    console.log(accessToken)

    let kakaoUserInfo = await request(option)
        console.log(kakaoUserInfo); 
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
            const dbUserInfo = await User.isUser(kakaoUserInfo.id)
            console.log("kakaoUserInfo : " + kakaoUserInfo.id)
            console.log(dbUserInfo)

            if (dbUserInfo.length != 0) {
                // console.log("dbUserInfo" + dbUserInfo)
                console.log("other device login")
                const newToken = jwt.sign(kakaoUserInfo.id, dbUserInfo.grade)
                return {
                    id: kakaoUserInfo.id,
                    grade: dbUserInfo.grade,
                    authorization: newToken
                }
            }
            //새로운 회원 
            else {
                // insertUser
                console.log("new user")
                let profile_img
                // http -> https
                if(kakaoUserInfo.properties.hasOwnProperty('thumbnail_image')){
                    profile_img = 'https' + kakaoUserInfo.properties.thumbnail_image.split('http')[1]
                }
                else{
                    profile_img = s3 + '/user/2018/10/01/default_img.png'
                }
                console.log(profile_img)

                // User.createUser(kakaoUserInfo.id, kakaoUserInfo.properties.nickname, profile_img)
                // .then((result) => {
                //     return newToken = jwt.sign(kakaoUserInfo.id, 0)
                // }).then((result) => {
                //     console.log(result)
                //     return {
                //         id: kakaoUserInfo.id,
                //         grade: 0,
                //         authorization: newToken
                //     }
                // }).catch(
                //     (err) => {return err}
                // )

                await User.createUser(kakaoUserInfo.id, kakaoUserInfo.properties.nickname, profile_img)
                
                const newToken = jwt.sign(kakaoUserInfo.id, 0)
                return {
                    id: kakaoUserInfo.id,
                    grade: 0,
                    authorization: newToken
                }
            }
        }
    }

}