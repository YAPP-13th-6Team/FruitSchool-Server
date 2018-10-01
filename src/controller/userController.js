const User = require("../../models/user")
const logic = require("../logic/userLogic")
const { respondJson, respondOnError } = require('../lib/response');

function kakaoSignin(req, res) {
    try {
        const result = logic.kakaoSignin(req.headers.authorization, req.body.access_token)
        respondJson("Success", result, res, 201)
    }
    catch (error) {
        console.log("router ok")
        respondOnError(error.message, res, error.statusCode)
    }
}

function getAllUser(req, res){
    try {
        const result = logic.getAllUser(req.headers.authorization)
        respondJson("Success", result, res, 201)
    }
    catch (error) {
        respondOnError(error.message, res, error.statusCode)
    }
}

function getUserPage(req, res){
    try {
        const result = logic.getUserPage(req.headers.authorization)
        respondJson("Success", result, res, 201)
    }
    catch (error) {
        respondOnError(error.message, res, error.statusCode)
    }
}

function setUserProfileImage(req,res){
    try {
        const result = logic.setUserProfileImage(req.headers.authorization)
        respondJson("Success", result, res, 201)
    }
    catch (error) {
        respondOnError(error.message, res, error.statusCode)
    }
}
module.exports = { kakaoSignin, getAllUser, getUserPage, setUserProfileImage}
