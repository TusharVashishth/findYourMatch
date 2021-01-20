const ChatUser = require("../models/ChatUsers")
const User = require("../models/Users")
const mongoose = require("mongoose")

exports.toUserStore = (req, res) => {
  const fromId = req.body.fromId
  const userObject = {}
  if (req.body.toId) userObject.toId = req.body.toId
  if (req.body.name) userObject.name = req.body.name
  if (req.body.imageUrl) userObject.imageUrl = req.body.imageUrl

  ChatUser.findOne({ userId: fromId })
    .then((chatUser) => {
      if (chatUser) {
        ChatUser.findOne({ userId: fromId, "chatUsers.toId": userObject.toId })
          .then((user) => {
            if (user) {
              return res.json({ message: "To user already exist" })
            } else {
              chatUser.chatUsers.unshift(userObject)
              chatUser
                .save()
                .then((users) => res.status(200).json(users))
                .catch((err) => console.log(err))
            }
          })
          .catch((err) => console.log(err))
      } else {
        const newChatUser = new ChatUser({
          userId: fromId,
          chatUsers: userObject,
        })
        newChatUser
          .save()
          .then((chatUser) => res.status(200).json(chatUser))
          .catch((err) => console.log(err))
      }
    })
    .catch((err) => console.log(err))
}

exports.fromUserStore = (req, res) => {
  const fromId = req.body.fromId
  const toId = req.body.toId
  ChatUser.findOne({ userId: fromId })
    .then((chatUser) => {
      if (chatUser) {
        ChatUser.findOne({ userId: fromId, "chatUsers.toId": toId })
          .then((user) => {
            if (user) {
              return res.json({ message: "To user already exist" })
            } else {
              User.findById({ _id: toId })
                .then((user) => {
                  chatUser.chatUsers.unshift({
                    name: user.name,
                    toId: toId,
                    imageUrl: user.imageUrl,
                  })
                  chatUser
                    .save()
                    .then((users) => res.status(200).json(users))
                    .catch((err) => console.log(err))
                })
                .catch((err) => console.log(err))
            }
          })
          .catch((err) => console.log(err))
      } else {
        User.findById({ _id: toId })
          .then((user) => {
            const newChatUser = new ChatUser({
              userId: fromId,
              chatUsers: {
                name: user.name,
                toId: toId,
                imageUrl: user.imageUrl,
              },
            })
            newChatUser
              .save()
              .then((chatUser) => res.status(200).json(chatUser))
              .catch((err) => console.log(err))
          })
          .catch((err) => console.log(err))
      }
    })
    .catch((err) => console.log(err))
}

exports.list = (req, res) => {
  const id = req.body.id
  ChatUser.aggregate([
    {
      $match: { userId: mongoose.Types.ObjectId(id) },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "fromUser",
      },
    },
  ])

    .then((chatUser) => res.status(200).json(chatUser))
    .catch((err) => console.log(err))
}
