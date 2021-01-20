const router = require("express").Router()

// * For User route
const user = require("./route/user")
router.use("/api/user", user)

// * For ChatUser route
const chatUser = require("./route/chatUser")
router.use("/api/chatUsers", chatUser)

// * for Message route

const message = require("./route/message")
router.use("/api/message", message)
module.exports = router
