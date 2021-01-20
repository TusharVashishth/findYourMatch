const mongoose = require("mongoose")
const { mongoURL } = require("../config/keys")

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Database connected successfully."))
  .catch((err) => console.log(err))
