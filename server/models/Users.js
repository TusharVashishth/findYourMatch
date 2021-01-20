const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
  authId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default: null,
  },
  imageUrl: {
    type: String,
  },
  age: {
    type: Number,
    default: null,
  },
  country: {
    type: String,
    default: null,
  },
  state: {
    type: String,
    default: null,
  },
  city: {
    type: String,
    default: null,
  },

  maritalStatus: {
    type: String,
    default: null,
  },
  isProfile: {
    type: Boolean,
    default: false,
  },
  isChat: {
    type: Boolean,
    default: false,
  },
  gender: {
    type: String,
    default: null,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = User = mongoose.model("users", UserSchema)
