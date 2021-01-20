const mongoose = require("mongoose")
const MessageSchema = new mongoose.Schema({
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  body: {
    type: String,
    required: true,
  },
  fromImage: {
    type: String,
    default: null,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Message = mongoose.model("messages", MessageSchema)
