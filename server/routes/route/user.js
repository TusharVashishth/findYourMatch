const router = require("express").Router()
const UserController = require("../../controller/UserController")
const passport = require("passport")

// * Url /api/user
router.post("/auth", UserController.Login)
router.get("/", UserController.show)
router.post("/update", UserController.updateProfile)
router.post("/find-friends", UserController.findFriends)
router.post("/search", UserController.searchUserByName)
router.post("/chat-users", UserController.getchatUser)
module.exports = router
