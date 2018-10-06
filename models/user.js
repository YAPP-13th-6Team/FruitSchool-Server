const mongoose = require("mongoose")

const User = new mongoose.Schema({
    user_id: String, 
    nickname: String,
    grade: { type: Number, required: true, default: 0, min: 0, max: 2 },
    profile_image: {type: String, required: true}},
{
    versionKey: false
})
User.statics.isUser = function(id){
    this.findOne({ _id: id }, (err, user) => {
        if(user) {
            return 1
        }
            return 0
    })
}
/* find one user by using id */
User.statics.getUserById = function(id) {
    return this.findOne({ _id:id }).exec()
}

/* find one user by using name */
User.statics.getUserByNickname = function(nickname) {
    return this.findOne({nickname}).exec()
}

/* find all user */
User.statics.getAllUser = function(){
    console.log("User getAllUser")
    return this.find({}).exec()
}

/* create one user */
User.statics.createUser = function(user_id, nickname, profile_image){
    console.log(user_id, nickname, profile_image)
    const user = new this({
        user_id, 
        nickname, 
       profile_image,
        grade: 0
    })
    return user.save()
}

User.statics.updateGrade = function(id, upgrade){
    return this.updateOne({ _id: id}, { $set: { grade: upgrade }}, {new: true  })
    // return this.findAndModify({ query: { _id: id }, update: { $set: { grade: 0 } }, new: true });
}

/* 한결쓰 머지 부분 */
// function createUser(req, res) {
//     const body = req.body
//     const id = body.id
//     const nickname = body.nickname
//     const user = new User({
//         id, nickname,
//         grade: 0
//     })
//     user.save(err => {
//         if(err) {
//             return res.status(400)
//         }
//         return res.sendStatus(201)
//     })
// }

/* 한결쓰 머지 부분 */
// function checkDuplicatedUser(req, res) {
//     const id = req.body.id
//     User.findOne({ id }, (err, user) => {
//         if(user) {
//             return res.sendStatus(409)
//         }
//         return res.sendStatus(200)
//     })
// }

// function updateGrade(req, res) {
//     const body = req.body
//     const id = body.id
//     const grade = body.grade
//     User.findOne({ id }, projection, (err, user) => {
//         if(!user) {
//             return res.sendStatus(404)
//         }
//         User.updateOne({ id }, { $set: { grade }}, err => {
//             if(err) {
//                 return res.sendStatus(400)
//             }
//             return res.sendStatus(201)
//         })
//     })
// }

// function readAll(req, res) {
//     User.find({}, projection, (err, users) => {
//         if(err) {
//             return res.sendStatus(400)
//         }
//         const count = users.length
//         if(count === 0) {
//             return res.sendStatus(404)
//         }
//         return res.status(200).json(users)
//     })
// }

// function readById(req, res) {
//     const id = req.params.id
//     User.findOne({ _id: id }, projection, (err, users) => {
//         if(err) {
//             return res.sendStatus(400)
//         }
//         const count = users.length
//         if(count === 0) {
//             return res.sendStatus(404)
//         }
//         return res.status(200).json(users)
//     })
// }

module.exports = mongoose.model("User", User)