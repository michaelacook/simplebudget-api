const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const createError = require("http-errors")
const logger = require("morgan")
const cors = require("cors")

const indexRouter = require("./routes/index")
const usersRouter = require("./routes/users")
const budgetsRouter = require("./routes/budgets")
const expendituresRouter = require("./routes/expenditures")
const billsRouter = require("./routes/bills")

const app = express()

app.use(cors())
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("/", indexRouter)
app.use("/user", usersRouter)
app.use("/budget", budgetsRouter)
app.use("/expenditures", expendituresRouter)
app.use("/bill", billsRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    })
    console.log(err.message, err.stack)
  } else {
    res.status(err.status || 500).json(err.message)
  }
})

module.exports = app
