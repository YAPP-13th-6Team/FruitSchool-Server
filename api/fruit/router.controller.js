const Fruit = require("./fruit")
const projection = { "standard_tip._id": false, "intake_tip._id": false, "nutrition_tip._id": false }

function readAll(req, res) {
    Fruit.find({}, projection, (err, fruits) => {
        if(err) {
            return res.sendStatus(400)
        }
        const count = fruits.length
        if(count === 0) {
            return res.sendStatus(404)
        }
        return res.status(200).json(fruits)
    })
}

function readById(req, res) {
    const id = req.params.id
    Fruit.findOne({ _id: id }, projection, (err, fruits) => {
        if(err) {
            return res.sendStatus(400)
        }
        const count = fruits.length
        if(count === 0) {
            return res.sendStatus(404)
        }
        return res.status(200).json(fruits)
    })
}

module.exports = { readAll, readById }