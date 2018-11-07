var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const config = require('./config/secretKey');
const database = require("./config/database");
var app = express();


app.set('jwt-token', config.secret);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./src/routes'))

app.listen(3000, () => {
  database()
  console.log("3000번 포트에서 서버 실행중...")
})

module.exports = app;
