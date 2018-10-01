const CommonSense = require("../../models/common_sense")
const projection = { "_id": false }

function readByGrade(req, res) {
    const grade = req.params.grade
    CommonSense.findOne({ grade }, projection, (err, commonSenses) => {
        if(err) {
            return res.sendStatus(400)
        }
        const count = commonSenses.length
        if(count === 0) {
            return res.sendStatus(404)
        }
        return res.status(200).json(commonSenses)
    })
}

module.exports = { readByGrade }