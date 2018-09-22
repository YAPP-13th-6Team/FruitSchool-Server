const mongoose = require("mongoose")
const mongoDBURL = "mongodb://localhost:27017/fruitschool"

module.exports = () => {
    function connect() {
        mongoose.connect(mongoDBURL, { useNewUrlParser: true }, err => {
            if(err) {
                throw err
            }
            console.log("MongoDB Connected")
        })
    }
    connect()
    mongoose.connection.on("disconnected", connect)
}