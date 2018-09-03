var express = require('express');
var router = express.Router();
const async = require('async');
const pool = require('../../config/dbPool');
const crypto = require('crypto');

router.post('/', function(req, res) {
  let email = req.body.email;
  let password = req.body.password;

  let taskArray = [
    //1. connection 만들기 함수
    function(callback) {
      pool.getConnection(function(err, connection) {
        if(err) {
          res.status(500).send({
            status : "fail",
            message : "fail"
          });//res.status(500).send
          console.log(err);
          callback(err);
        } else {
          callback(null, connection);
        }
      });//pool.getConnection
    },
    //2. mysql search mail
    function(connection, callback) {
      let checkMailQuery = 'SELECT * FROM user WHERE email = ?';
      connection.query(checkMailQuery, email, function(err, result) {
        if(err) {
          res.status(500).send({
            status : "fail",
            message : "internal server error"
          });
          console.log(err);
          connection.release();
          callback("internal server error");
        } else {
          if(result.length === 0) {
            res.status(500).send({
              status : "fail",
              message : "failed login"
            });
            connection.release();
            callback("failed login");
          } else {
            callback(null, connection, result[0]);
          }
        }
      });//connection.query(checkMailQuery)
    },//function(connection, callback)
    //3. crypto and compare
    // 2nd function의 callback 3번째 인자로 넘어온 result[0] => object 로 대응됨
    function(connection, object, callback) {
      crypto.pbkdf2(password, object.u_salt, 100000, 64, 'sha512', function(err, hashed) {
        if(err) {
          res.status(500).send({
            status : "fail",
            message : "internal server error"
          });
          console.log(err);
          connection.release();
          callback("internal server error");
        } else {
          let cryptopwd = hashed.toString('base64');
          if(object.password === cryptopwd) {
            // db pwd와 body pwd 값이 같을 경우 => 로그인!
            res.status(201).send({
              status : "success",
              message : "successfully login"
            });
            connection.release();
            callback(null, "successfully login");
          } else {
            // db pwd와 body pwd 값이 다를 경우 => 로그인 하면 안됨
            res.status(500).send({
              status : "fail",
              message : "failed login"
            });
            connection.release();
            callback('failed login');
          }
        }
      });//crypto.pbkdf2
    }//function(connection, object, callback)
  ];//taskArray

  async.waterfall(taskArray, (err, result) => {
    if(err) console.log(err);
    else console.log(result);
  });//async.waterfall
});

module.exports = router;
