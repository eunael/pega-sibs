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
  res.send('Em manutenção. (tutorial)');
  // res.render('tutorial')
});
router.get('/sobre', function(req, res, next) {
  res.send('Em manutenção. (sobre)');
});

module.exports = router;
