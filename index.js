const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(helmet())

app.use(cors({
  origin: process.env.NODE_ENV === "development" ? "http://localhost:3000" : /codernews\.com$/,
  credentials: true
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieParser())

app.use(require("./routes/users/index.js"))
app.use(require("./routes/items/index.js"))
app.use(require("./routes/comments/index.js"))
app.use(require("./routes/moderation/index.js"))

app.listen(PORT, function () {
  console.log(`Express app listening on port ${PORT}`)
})
