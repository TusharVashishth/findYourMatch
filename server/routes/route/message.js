const router = require("express").Router()
const MessageController = require("../../controller/MessageController")

// *url => /api/message
router.get("/", MessageController.list)

module.exports = router
