const User = require("./user")
const projection = { "_id": false }

function createUser(req, res) {
    const body = req.body
    const id = body.id
    const nickname = body.nickname
    User.findOne({ id }, projection, (err, user) => {
        if(err) {
            return res.sendStatus(400)
        }
        if(user) {
            /**
             * 409 Conflict
             * 사용자가 이미 존재함
             * 앱 삭제 후 다시 설치하여 사용하는 사용자의 경우일 수 있음
             */
            return res.sendStatus(409)
        } else {
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

module.exports = { createUser, updateGrade }