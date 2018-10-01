var express = require('express');
var router = express.Router();

const signup = require('./signup');
router.use('/signup', signup);

const signin = require('./signin');
router.use('/signin', signin);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
