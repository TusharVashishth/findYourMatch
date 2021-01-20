const User = require("../models/Users")
const Message = require("../models/Message")
const jwt = require("jsonwebtoken")
const { secretKey } = require("../config/keys")
const profileValidator = require("../validator/profileValidator")

exports.Login = (req, res) => {
  const data = req.body
  User.findOne({ authId: data.authId })
    .then((user) => {
      if (user) {
        const paylod = {
          id: user._id,
          name: user.name,
          email: user.email,
          isProfile: user.isProfile,
          isChat: user.isChat,
          image: user.imageUrl,
        }
        jwt.sign(
          { data: paylod },
          secretKey,
          { expiresIn: "3600h" },
          (err, token) => {
            if (token) {
              res.status(200).json({
                success: true,
                token: "Bearer " + token,
              })
            }
          }
        )
      } else {
        const newUser = new User(data)
        newUser
          .save()
          .then((user) => {
            const paylod = {
              id: user._id,
              name: user.name,
              email: user.email,
              isProfile: user.isProfile,
              isChat: user.isChat,
              image: user.imageUrl,
            }
            jwt.sign(
              { data: paylod },
              secretKey,
              { expiresIn: "3600h" },
              (err, token) => {
                if (token) {
                  res.status(200).json({
                    success: true,
                    token: "Bearer " + token,
                  })
                }
              }
            )
          })
          .catch((err) => console.log(err))
      }
    })
    .catch((err) => console.log(err))
}

exports.updateProfile = (req, res) => {
  const { errors } = profileValidator(req.body)

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors)
  }
  let profileObject = {}
  if (req.body.age) profileObject.age = req.body.age
  if (req.body.country) profileObject.country = req.body.country
  if (req.body.state) profileObject.state = req.body.state
  if (req.body.city) profileObject.city = req.body.city
  if (req.body.maritalStatus)
    profileObject.maritalStatus = req.body.maritalStatus
  if (req.body.isProfile) profileObject.isProfile = req.body.isProfile

  User.findByIdAndUpdate(
    { _id: req.body.id },
    { $set: profileObject },
    { new: true }
  )
    .then(
      (user = res.status(200).json({ message: "Profile Updated Successfully" }))
    )
    .catch((err) => console.log(err))
}
exports.show = (req, res) => {
  const { id } = req.query
  User.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => console.log(err))
}

exports.findFriends = (req, res) => {
  const id = req.body.id
  User.find({ _id: { $ne: id } })
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((err) => console.log(err))
}

exports.searchUserByName = (req, res) => {
  const name = req.body.name
  const id = req.body.id
  User.find({
    $and: [{ name: new RegExp(name, "i") }, { _id: { $ne: id } }],
  })
    .then((user) => {
      if (user.length > 0) {
        return res.status(200).json(user)
      }
      res.status(404).json(user)
    })
    .catch((err) => console.log(err))
}

// * Getting chat user list

exports.getchatUser = (req, res) => {
  const toId = req.body.toId
  const fromId = req.body.fromId

  Message.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "to",
        foreignField: "_id",
        as: "toObj",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "from",
        foreignField: "_id",
        as: "fromObj",
      },
    },
  ])
    .match({
      $or: [
        // { $and: [{ to: toId }, { from: fromId }] },
        { $and: [{ to: fromId }, { from: toId }] },
      ],
    })
    .then((users) => res.json(users))
    .catch((err) => console.log(err))
}
