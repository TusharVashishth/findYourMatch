const mongoose = require("mongoose")
const ChatUserSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  chatUsers: [
    {
      toId: {
        type: String,
        default: null,
      },
      name: {
        type: String,
        default: null,
      },
      imageUrl: {
        type: String,
      },
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = ChatUser = mongoose.model("chatUsers", ChatUserSchema)
