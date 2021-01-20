const express = require("express")
const app = express()
const http = require("http").createServer(app)
const io = require("socket.io")(http)
const cors = require("cors")
const passport = require("passport")
const { messages } = require("./controller/MessageController")

// * Use middeleware
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get("/", (req, res) => {
  res.json("hello")
})

io.on("connection", function (socket) {
  console.log("A user connected")
  messages(socket)

  socket.on("disconnect", () => {
    console.log("user disconnected")
  })
})

// * for db connection
require("./db/connection")

// * for routes
app.use("/", require("./routes/web"))

// * apply passport strategy
app.use(passport.initialize())
app.use(passport.session())
require("./strategies/userStrategy")(passport)

const PORT = process.env.PORT || 5000
http.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
