const express = require("express")
const router = express.Router()
const controller = require("../controller/commentController")

router.post("/:id", controller.postComment)
router.post("/edit/:id", controller.editComment)
router.delete("/:id", controller.deleteComment)

module.exports = router

