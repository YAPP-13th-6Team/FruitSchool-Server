const express = require("express")
const router = express.Router()
const controller = require("../controller/commentController")
const userCheck = require('../middleware/userCheck')


router.post("/:id", userCheck, controller.postComment)
router.post("/edit/:id", userCheck, controller.editComment)
router.delete("/:id", userCheck, controller.deleteComment)

module.exports = router

