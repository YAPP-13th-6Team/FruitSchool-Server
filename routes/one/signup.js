var express = require('express');
var router = express.Router();
const async = require('async');
const pool = require('../../config/dbPool');
const crypto = require('crypto');

router.post('/', function(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  let nickname = req.body.nickname;

  console.log(typeof(password));
  let taskArray = [
    //1. connection 만들기 함수
    function(callback) {
      pool.getConnection(function(err, connection) {
        if(err) {
          res.status(500).send({
            status : "fail",
            message : "fail"
          });//res.status(500).send
          callback(err);
        } else {
          callback(null, connection);
        }
      });//pool.getConnection
    },
    //2. mysql search email
    function(connection, callback) {
      let checkMailQuery = 'SELECT * FROM user WHERE email = ?';
      connection.query(checkMailQuery, [email], function(err, result) {
        if(err) {
          res.status(500).send({
            status : 'fail',
            message : 'mysql error' + err
          });
          connection.release();
          callback('mysql error' + err);
        } else {
          if(result.length === 0) {
            //회원가입
            callback(null, connection);
          } else {
            //이메일이 DB에 존재
            res.status(500).send({
              status : "fail",
              message : "already id in db"
            });
            connection.release();
            callback('already id in db');
          }
        }
      });//connection.query
    },//function(connection, callback)

    //2-2. mysql search nickname
    function(connection, callback) {
      let checkNicknameQuery = 'SELECT * FROM user WHERE nickname = ?';
      connection.query(checkNicknameQuery, [nickname], function(err, result) {
        if(err) {
          res.status(500).send({
            status : 'fail',
            message : 'mysql error' + err
          });
          connection.release();
          callback('mysql error' + err);
        } else {
          if(result.length === 0) {
            //회원가입
            callback(null, connection);
          } else {
            //nickname이 DB에 존재
            res.status(500).send({
              status : "fail",
              message : "already id in db"
            });
            connection.release();
            callback('already id in db');
          }
        }
      });//connection.query
    },//function(connection, callback)

    //3. crypto and insert
    function(connection, callback) {
      crypto.randomBytes(32, function(err, buffer) {
        if(err) {
          res.status(500).send({
            status : "fail",
            message : "internal server error"
          });
          connection.release();
          callback('internal server error');
        } else {
          let salt = buffer.toString('base64');
          crypto.pbkdf2(password, salt, 100000, 64, 'sha512', function(err, hashed) {
            if(err) {
              res.status(500).send({
                status : "fail",
                message : "internal server error"
              });
              connection.release();
              callback('internal server error');
            } else {
              let cryptopwd = hashed.toString('base64');
              // let current_date = (new Date()).valueOf().toString();
              // let random = Math.random().toString();
              // let cryptouid = crypto.createHash('sha1').update(current_date + random).digest('hex');
              console.log(salt);
              let insertQuery = 'INSERT INTO user (u_salt, email, password, nickname, level, grade) values (?, ?, ?, ?, "aaa", 0)';
              connection.query(insertQuery, [salt, email, cryptopwd, nickname], function(err, result) {
                if(err) {
                  res.status(500).send({
                    status : "fail",
                    message : "internal server error"
                  });
                  console.log(err);
                  connection.release();
                  callback('internal server error');
                } else {
                  res.status(201).send({
                    status : "success",
                    message : "successfully register"
                  });//res.status(201).send
                  connection.release();
                  callback(null, "successfully register");
                }
              });//connection.query(insertQuery)
            }
          });//crypto.pbkdf2
        }
      })//crypto.randomBytes
    }
  ];//taskArray

  async.waterfall(taskArray, (err, result) => {
    if(err) console.log(err);
    else console.log(result);
  });//async.waterfall
});

module.exports = router;
