var express = require('express');
var router = express.Router();
const { route } = require('express/lib/application');
const sequelize = require('sequelize');
const { Sequelize } = require('sequelize/types');
// const userAdmin = require('../app/models/userAdmin.js')
const userAdmin = require('../app/models/useradm.js')
const User = userAdmin(sequelize,Sequelize);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('initial_screen');
});
router.get('/catch-catch', function(req, res, next) {
  res.render('index');
});
router.get('/tutorial', function(req, res, next) {
  res.render('tutorial')
});
router.get('/sobre', function(req, res, next) {
  res.render('sobre')
});

// admin
router.get('/login', function(req, res, next){
  var user = User.findOne({
    where: {
      id: 1
    }
  })
  res.send(user)
  // res.render('administracao/login')
})
router.post('/auth', function(req, res, next){
  // se login foi concluído
  // req.session.user = user
  var userLogin = userAdmin.findOne({
    where: {
      email: req.body.email,
      senha: req.body.senha,
    }
  })
  res.send(userLogin)
})
router.post('/admin', function(req, res, next) {
  if(req.session.user){
    // retorna a view
  }

  return res.redirect('/login')
})

module.exports = router;
