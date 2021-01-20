const router = require("express").Router()
const ChatUserController = require("../../controller/ChatUserController")
// * url => /api/chatUsers

router.post("/store-to-user", ChatUserController.toUserStore)
router.post("/store-from-user", ChatUserController.fromUserStore)
router.post("/list", ChatUserController.list)
module.exports = router
