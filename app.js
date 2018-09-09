// Express
var express = require('express');
var app = express();

// view engine setup
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Database connection
var mysql = require("mysql");
app.use(function(req, res, next){
	res.locals.connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'elo'
	});
	res.locals.connection.connect();
	next();
});

// REST API
var indexRouter = require('./routes/index');
var addGameRouter = require('./routes/addGameToLeague');
var addPlayerRouter = require('./routes/addPlayerToLeague');
var getExpectedScoreRouter = require('./routes/getExpectedScore');
var getHistoryRouter = require('./routes/getLeagueHistory');
var getPlayerHistoryRouter = require('./routes/getPlayerHistory');
var getPlayersRouter = require('./routes/getPlayersInLeague');
app.use('/', indexRouter);
app.use('/addGame', addGameRouter);
app.use('/addPlayer', addPlayerRouter);
app.use('/getExpectedScore', getExpectedScoreRouter);
app.use('/getHistory', getHistoryRouter);
app.use('/getPlayerHistory', getPlayerHistoryRouter);
app.use('/getPlayers', getPlayersRouter);

// catch 404 and forward to error handler
var createError = require('http-errors');
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
