var express = require('express');
var path = require('path');
const url = require('url');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080, clientTracking: true });

wss.getUniqueID = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4();
};

require('dotenv').config()

var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', index);

let users = {};

wss.on('connection', function (ws, req) {
  if (!ws.chatRoom) {
    ws.chatRoom = {};
  }
  ws.on('open', function () {
    console.log('open');
  })

  // remove client from lobby
  ws.on('close', function () {
    console.log('close');

    delete users[ws.uid];

    console.log(JSON.stringify(users), ws.uid);

    wss.clients.forEach(function (client) {
      client.send(JSON.stringify(users))
    });
  })

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  const parameters = url.parse(req.url, true);

  ws.uid = wss.getUniqueID();
  ws.chatRoom[ws.uid] = { uid: ws.uid };
  ws.hereMyCustomParameter = parameters.query.myCustomParam;

  users[ws.uid] = ws.uid;

  wss.clients.forEach(function (client) {
    client.send(JSON.stringify(users))
  });

  // ws.send(`new user connected: uid: ${ws.uid}`);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
