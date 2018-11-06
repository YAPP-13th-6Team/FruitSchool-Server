const express = require("express")
const router = express.Router()
const controller = require("../controller/commentController")
const userCheck = require('../middleware/userCheck')


router.post("/:id",  controller.postComment)
router.post("/edit/:id", controller.editComment)
router.delete("/:id", controller.deleteComment)

module.exports = router

