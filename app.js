var express = require('express');
var session = require('express-session')
var path = require('path');
var logger = require('morgan');
var bodyParser =  require('body-parser')

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: "G@rn3t"}))
app.use(bodyParser.urlencoded({extended:true}))


app.use('/', indexRouter);


// const Sequelize = require('sequelize')
// const sequelize = new Sequelize('catch_catch', 'root', '12345678', {
//     host: 'localhost',
//     dialect: 'mysql',
// })

// models
// const { User } = require('./app/models');

// async function connect() {
//   await sequelize.authenticate()
//       .then(() => {
//         console.log('Autenticado com sucesso!');
//       })
//       .catch(() => {
//         console.log('Vish, deu bom não.');
//       })
// }
// connect()

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;
