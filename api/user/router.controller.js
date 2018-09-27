const User = require("./user")
const projection = { "_id": false }

function createUser(req, res) {
    const body = req.body
    const id = body.id
    const nickname = body.nickname
    const user = new User({
        id, nickname,
        grade: 0
    })
    user.save(err => {
        if(err) {
            return res.status(400)
        }
        return res.sendStatus(201)
    })
}

function checkDuplicatedUser(req, res) {
    const id = req.body.id
    User.findOne({ id }, (err, user) => {
        if(user) {
            return res.sendStatus(409)
        }
        return res.sendStatus(200)
    })
}

function updateGrade(req, res) {
    const body = req.body
    const id = body.id
    const grade = body.grade
    User.findOne({ id }, projection, (err, user) => {
        if(!user) {
            return res.sendStatus(404)
        }
        User.updateOne({ id }, { $set: { grade }}, err => {
            if(err) {
                return res.sendStatus(400)
            }
            return res.sendStatus(201)
        })
    })
}

module.exports = { createUser, checkDuplicatedUser, updateGrade }