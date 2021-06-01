require('dotenv').config();
var createError = require('http-errors');
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database!'));

var authRouter = require('./routes/auth');
var blockRouter = require('./routes/blocks');
var postRouter = require('./routes/posts');
var userRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');

var app = express();

// Sentry setup
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// Nginx handles CORS for production
if (process.env.NODE_ENV == "development") {
  const cors = require('cors');

  app.use(cors({
    origin: `${process.env.ACCESS_CONTROL_ALLOW_ORIGIN}`,
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
    credentials: true,
    exposedHeaders: 'X-Total-Count'
  }));
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRouter);
app.use('/blocks', blockRouter);
app.use('/posts', postRouter);
app.use('/users', userRouter);
app.use('/testAPI', testAPIRouter);

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  let statusCode = 500;
  let message = res.sentry + "\n";

  if (process.env.NODE_ENV == "development") {
    statusCode = err.status || 500;
    message = err + "\n";
  }

  res.status(statusCode);
  res.end(message);
});

module.exports = app;
