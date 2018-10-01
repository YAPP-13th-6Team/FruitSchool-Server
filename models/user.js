const mongoose = require("mongoose")
const projection = { "standard_tip._id": false, "intake_tip._id": false, "nutrition_tip._id": false }

const User = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    nickname: String,
    grade: { type: Number, required: true, default: 0, min: 0, max: 2 }
}, {
    versionKey: false
})

/* find one user by using id */
User.statics.getUserById = function(id) {
    return this.findOne({id}).exec()
}

/* find one user by using name */
User.statics.getUserByNickname = function(nickname) {
    return this.findOne({nickname}).exec()
}

/* create one user */
User.statics.createUser = function(id, nickname, profile_image){
    const user = new this({
        id: id,
        nockname: nickname,
        grade: 0,
        profile_image: profile_image
    })
    return user.save()
}

/* find all user */
User.statics.getAllUser = function(){
    return this.find({}, projection).exec()
}

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

module.exports = mongoose.model("user", User)