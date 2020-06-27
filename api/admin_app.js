require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var Sentry = require('@sentry/node');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database!'));

var postRouter = require('./routes/posts_admin');

var app = express();

// Sentry setup
Sentry.init({ dsn: process.env.SENTRY_DSN });

// The request handler must be the first
app.use(Sentry.Handlers.requestHandler());

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/posts', postRouter);

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  const status = err.status || 500
  res.status(status);
  res.send(`${status} - ${err.message}`);
});

module.exports = app;
