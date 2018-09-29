const mongoose = require("mongoose")
const mongoDBURL = "mongodb://fruitschool:USTmxL3v1rRwMFWH68rl6B9LOsUhjCrVZtX3jbyp8IUjSwIMuhtOwQ8vQ9h49cNFstJo3D05vW7HFXVeU6tJPQ==@fruitschool.documents.azure.com:10255/fruitschool?ssl=true&replicaSet=globaldb"

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

