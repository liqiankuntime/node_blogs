var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

var index = require('./routes/index');
var users = require('./routes/users');
const user = require('./routes/user');
const blog = require('./routes/blog');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());//类似 getPostData
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const redisClient = require('./db/redis');
const sessionStore = new RedisStore({
  client: redisClient
})

app.use(
  session({
    secret: 'Blog_Node$8543%#',
    cookie: {
      path: '/', //默认配置
      httpOnly: true, //默认配置
      maxAge: 24*60*60*1000 //最大时间是24小时，过了24小时这个会话就过期
    },
    store: sessionStore
  })
)

app.use('/', index);
app.use('/users', users);

app.use('/api/user', user);
app.use('/api/blog', blog);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
