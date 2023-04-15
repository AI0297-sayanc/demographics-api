const createError = require("http-errors")
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const cors = require("cors")
const helmet = require("helmet")

require("dotenv").config()

const logger = require("./lib/logger")

const restRoutes = require("./routes/rest")
const webRoutes = require("./routes/web")

const app = express()

if (process.env.NODE_ENV !== undefined && process.env.NODE_ENV !== "development") {
  app.use(helmet())
}
app.use(cors())

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(morgan("dev"))
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: false, limit: "50mb" }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.use((req, res, next) => { req.logger = logger; return next() })

app.use("/", webRoutes)
app.use(`/api/v${process.env.API_VERSION}`, restRoutes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
