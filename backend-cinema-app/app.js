var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usuarioRouter = require('./routes/usuarios');
var comentariosRouter = require('./routes/comentarios')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares - IMPORTANTE: El orden es crucial
app.use(logger('dev'));
app.use(cors(corsOptions)); // Aplica CORS a todas las rutas
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', usuarioRouter);
app.use('/comentarios', comentariosRouter)

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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;