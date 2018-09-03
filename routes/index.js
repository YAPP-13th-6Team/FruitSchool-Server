var express = require('express');
var router = express.Router();

const one = require('./one/index');
// const two = require('./two/index');
// const three = require('./three/index');
// const four = require('./four/index');
// const five = require('./five/index');



router.use('/', one);         // 'localhost:3000/signup' or 'localhost:3000/signin'
//router.use('/books', two);   // 'localhost:3000/books'
//router.use('/posts', three); // 'localhost:3000/detail/:topic/:index'
//router.use('/users', four);    // 'localhost:3000/past/:topic'

module.exports = router
