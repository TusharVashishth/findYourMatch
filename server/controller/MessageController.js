const Message = require("../models/Message")
exports.messages = function (socket) {
  socket.on("message", function (data) {
    socket.broadcast.emit("server message", data)

    const newMessage = new Message(data[0])
    newMessage
      .save()
      .then(() => {})
      .catch((err) => console.log(err))
  })
}

exports.list = (req, res) => {
  // const skip = Number(req.query.skip) || 0
  // const limit = Number(req.query.limit) || 10

  let { skip = 0, limit = 100, toId, fromId } = req.query
  skip = Number(skip)
  limit = Number(limit)
  Promise.all([
    Message.countDocuments(),
    Message.find({
      $or: [
        {
          $and: [{ to: toId }, { from: fromId }],
        },
        {
          $and: [{ to: fromId }, { from: toId }],
        },
      ],
    })
      .limit(limit)
      .skip(skip),
  ])
    .then(([totalMessages, messages]) =>
      res.status(200).json({ totalMessages, skip, limit, messages })
    )
    .catch((err) => console.log(err))
}
