const User = require("../../models/user")
const projection = { "standard_tip._id": false, "intake_tip._id": false, "nutrition_tip._id": false }

function readAll(req, res) {
    User.find({}, projection, (err, users) => {
        if(err) {
            return res.sendStatus(400)
        }
        const count = users.length
        if(count === 0) {
            return res.sendStatus(404)
        }
        return res.status(200).json(users)
    })
}

function readById(req, res) {
    const id = req.params.id
    User.findOne({ _id: id }, projection, (err, users) => {
        if(err) {
            return res.sendStatus(400)
        }
        const count = users.length
        if(count === 0) {
            return res.sendStatus(404)
        }
        return res.status(200).json(users)
    })
}

module.exports = { readAll, readById }