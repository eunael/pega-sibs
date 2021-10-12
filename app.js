var express = require('express');
var path = require('path');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// module.exports = app;
const port = 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

