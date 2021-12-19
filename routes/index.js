var express = require('express');
var router = express.Router();

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
  // res.send('Em manutenção. (sobre)');
  res.render('sobre')
});
router.get('/login', function(req, res, next){
  res.render('administracao/login')
})
router.get('/admin/palavras', function(req, res, next){
  res.render('administracao/index')
})
router.get('/admin/palavras/nova', function(req, res, next){
  res.render('administracao/create')
})

module.exports = router;
