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
  res.render('sobre')
});
router.get('/login', function(req, res, next){
  res.render('login')
})
router.post('/auth', function(req, res, next){
  res.send(req.body)
})
router.get('/admin', function(req, res, next){
  res.redirect('/login')
})
router.get('/admin/palavras', function(req, res, next){
  res.redirect('/login')
})
router.get('/admin/palavras/nova', function(req, res, next){
  res.redirect('/login')
})

module.exports = router;
