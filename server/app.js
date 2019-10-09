const createError = require('http-errors')
require('dotenv/config')
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const celebRouter = require('./routes/celeb')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

const app = express()

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
	console.log('connected to DB')
)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(cors())

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/api', celebRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render('error')
})

module.exports = app
